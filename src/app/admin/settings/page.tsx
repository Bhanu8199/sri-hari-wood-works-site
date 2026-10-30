import { SettingsForm } from '@/app/admin/settings/settings-form';
import { getBusinessHourConfig, getBusinessHolidays, getBusinessProfile, getPublishedServices } from '@/lib/business-settings';

export default async function AdminSettingsPage() {
  const [profile, hours, holidays, services] = await Promise.all([
    getBusinessProfile(),
    getBusinessHourConfig(),
    getBusinessHolidays(),
    getPublishedServices()
  ]);

  return (
    <div className="container-shell py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Settings</p>
        <h1 className="mt-2 text-4xl font-semibold text-walnut">Business profile & preferences</h1>
      </div>
      <SettingsForm profile={profile} hours={hours} holidays={holidays} services={services} />
    </div>
  );
}
