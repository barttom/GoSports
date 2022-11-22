import {useEffect, useState} from 'react';
import Settings, {SettingsAttr} from '../realm/objects/Settings';
import {ThemeMode} from '../constants/themeMode';
import {realmConfig} from '../realm';

export const useInitialSettings = () => {
  const [settings, setSettings] = useState<SettingsAttr>({
    themeMode: ThemeMode.device,
  });

  useEffect(() => {
    (async () => {
      const realm = await Realm.open(realmConfig);
      const tempSettings = await realm.objects<Settings>('Settings');

      if (tempSettings[0]) {
        setSettings({themeMode: tempSettings[0].themeMode});
      } else {
        realm.write(() => {
          realm.create('Settings', Settings.generate(settings));
        });
      }

      tempSettings.addListener((items, changes) => {
        if (changes.newModifications.length > 0) {
          setSettings({themeMode: tempSettings[0].themeMode});
        }
      });
    })();
  }, []);

  return {
    userSettings: settings,
  };
};
