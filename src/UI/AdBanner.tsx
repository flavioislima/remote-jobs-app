import React from "react";
import { AdMobBanner } from "expo-ads-admob";

const unitId = "ca-app-pub-4477713466828746/3523474164";

export default () => (
  <AdMobBanner
    bannerSize="fullBanner"
    adUnitID={unitId} // Test ID, Replace with your-admob-unit-id
    testDeviceID="EMULATOR"
  />
);
