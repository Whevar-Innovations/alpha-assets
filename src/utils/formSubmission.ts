export interface FormSubmissionResult {
  success: boolean;
  message?: string;
}

export interface BaseFormPayload {
  [key: string]: string | number | boolean | undefined;
  _honey?: string;
  _subject?: string;
  _template?: string;
  _captcha?: string;
}

/**
 * Sends form data via FormSubmit AJAX endpoint.
 *
 * @param targetEmail The recipient email address.
 * @param payload Key-value pairs of form data.
 * @returns FormSubmissionResult indicating success or failure.
 */
export async function submitFormData(
  targetEmail: string,
  payload: BaseFormPayload
): Promise<FormSubmissionResult> {
  // Honeypot spam trap
  if (payload._honey) {
    return { success: true };
  }

  const cleanEmail = targetEmail.trim() || 'invest@alphaeastafrica.com';

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(cleanEmail)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        _captcha: 'false',
        _template: payload._template ?? 'table',
      }),
    });

    const result = (await response.json()) as { success?: string | boolean; message?: string };

    if (response.ok && (result.success === 'true' || result.success === true)) {
      return { success: true };
    }

    return {
      success: false,
      message:
        result.message ??
        `Unable to deliver your submission. Please try again or contact us directly at ${cleanEmail}.`,
    };
  } catch {
    return {
      success: false,
      message: `Network error occurred while submitting. Please check your connection or contact us at ${cleanEmail}.`,
    };
  }
}
