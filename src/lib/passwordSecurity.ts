const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export interface PasswordLeakCheckResult {
  leaked: boolean;
  count: number;
  error?: string;
}

export async function checkPasswordLeaked(
  password: string
): Promise<PasswordLeakCheckResult> {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/check-password-leaked`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      }
    );

    if (!response.ok) {
      return {
        leaked: false,
        count: 0,
        error: 'Failed to check password',
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      leaked: false,
      count: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
