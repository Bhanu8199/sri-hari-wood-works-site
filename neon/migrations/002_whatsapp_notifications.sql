ALTER TABLE enquiries
  ADD COLUMN IF NOT EXISTS whatsapp_notification_status TEXT NOT NULL DEFAULT 'not_configured'
  CHECK (whatsapp_notification_status IN ('pending', 'sent', 'failed', 'not_configured'));
