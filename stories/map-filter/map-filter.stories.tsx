import { MapFilter } from '../../src/MapFilter';
import { locations } from './mockData';
import config from '../../geo-config/config.json';
import { useState } from 'react';
import { type Location } from '../../src/types';

export default {
  title: 'MapFilter',
  component: MapFilter,
  decorators: [(Story: any) => <Story />],
  parameters: {
    layout: 'fullscreen',
  },
};

const filterCountryData = (name: string) => {
  const areaName = name.split(' ');
  const countryConfig = config.find((value) => value.iso === areaName[0]);
  if (!countryConfig) return locations;
  const filteredLocations = locations.filter((location) => {
    const { location: locationObj } = location;
    const countryMatch = locationObj.iso === areaName[0];
    if (countryConfig.groupByRegion && countryConfig.groups && countryMatch) {
      return countryConfig.groups.find(
        (group) =>
          group.name === areaName[1] && group.regions.includes(locationObj.region),
      );
    }
    return countryMatch;
  });
  return filteredLocations;
};

export const Default = () => {
  const [locationsData, setLocationsData] = useState<Location[]>(locations);
  if (!locations) return null;
  return (
    <MapFilter
      locations={locationsData}
      onCountryFilter={(name: string) => setLocationsData(filterCountryData(name))}
      onClearFilter={() => setLocationsData(locations)}
    />
  );
};
