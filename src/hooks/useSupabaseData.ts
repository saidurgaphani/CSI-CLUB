import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  form_link: string;
  status: 'upcoming' | 'past';
  image: string;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  image_url: string;
  type: 'faculty' | 'student'; // Added type field
}

export interface ClubSettings {
  join_form_link: string;
  contact_email: string;
  phone_number: string;
  social_media: {
    facebook: string;
    instagram: string;
    linkedin: string;
    whatsapp: string;
  };
}

interface SupabaseData {
  events: Event[];
  members: Member[];
  clubSettings: ClubSettings | null;
  loading: boolean;
  error: string | null;
}

export const useSupabaseData = (): SupabaseData => {
  const [events, setEvents] = useState<Event[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [clubSettings, setClubSettings] = useState<ClubSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch events
        const { data: eventsData, error: eventsError } = await supabase
          .from('events')
          .select('*')
          .order('date', { ascending: true });

        if (eventsError) throw eventsError;
        setEvents(eventsData || []);

        // Fetch members, including the new 'type' column
        const { data: membersData, error: membersError } = await supabase
          .from('members')
          .select('id, name, role, image_url, type') // Select 'type'
          .order('name', { ascending: true });

        if (membersError) throw membersError;
        setMembers(membersData || []);

        // Fetch club settings
        const { data: settingsData, error: settingsError } = await supabase
          .from('club_settings')
          .select('*')
          .single();

        if (settingsError && settingsError.code !== 'PGRST116') {
          throw settingsError;
        }

        if (settingsData) {
          setClubSettings({
            join_form_link: settingsData.join_form_link || '',
            contact_email: settingsData.contact_email || '',
            phone_number: settingsData.phone_number || '',
            social_media: {
              facebook: settingsData.social_media_facebook || '',
              instagram: settingsData.social_media_instagram || '',
              linkedin: settingsData.social_media_linkedin || '',
              whatsapp: settingsData.social_media_whatsapp || '',
            },
          });
        } else {
            setClubSettings({
                join_form_link: '',
                contact_email: '',
                phone_number: '',
                social_media: { facebook: '', instagram: '', linkedin: '', whatsapp: '' },
            });
        }

      } catch (err: any) {
        console.error('Error fetching data:', err.message);
        setError(err.message || 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { events, members, clubSettings, loading, error };
};
