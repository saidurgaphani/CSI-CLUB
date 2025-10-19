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

export interface ClubSettings {
  join_form_link: string;
  contact_email: string;
  phone_number: string;
  social_media: {
    facebook: string;
    instagram: string;
    linkedin: string;
  };
}

interface SupabaseData {
  events: Event[];
  clubSettings: ClubSettings | null;
  loading: boolean;
  error: string | null;
}

export const useSupabaseData = (): SupabaseData => {
  const [events, setEvents] = useState<Event[]>([]);
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

        // Fetch club settings
        const { data: settingsData, error: settingsError } = await supabase
          .from('club_settings')
          .select('*')
          .single(); // Assuming only one row for club settings

        // Supabase returns error code 'PGRST116' if no rows found for .single()
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
            },
          });
        } else {
            // If no settings found (e.g., table just created and no default insert yet),
            // provide empty defaults to prevent crashes.
            setClubSettings({
                join_form_link: '',
                contact_email: '',
                phone_number: '',
                social_media: { facebook: '', instagram: '', linkedin: '' },
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

  return { events, clubSettings, loading, error };
};
