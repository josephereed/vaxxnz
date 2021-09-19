import { useEffect, useState } from "react";
import WalkModal from "./today-locations/healthpoint/HealthpointModal";
import {
  getHealthpointData,
  HealthpointLocation,
  useHealthpointData,
  useHealthpointLocations,
} from "./today-locations/healthpoint/HealthpointData";
import { CrowdsourcedLocation } from "./crowdsourced/CrowdsourcedData";
import CrowdsourcedModal from "./crowdsourced/CrowdsourcedModal";
import { useParams, useHistory } from "react-router-dom";
import { simpleHash } from "./utils/simpleHash";
import { crowdsourcedLocations } from "./crowdsourced/CrowdsourcedLocations";
import { getSearch } from "./utils/url";

export function LocationRouter() {
  const { slug } = useParams<{ slug: string }>();
  const [hash] = slug.split("-").slice(-1);
  const history = useHistory();

  // const [healthpointLocations, setHealthpointLocations] = useState<
  //   HealthpointLocation[]
  // >([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<Error | null>(null);

  const healthpointLocationsResult = useHealthpointLocations();
  const loading = "loading" in healthpointLocationsResult;
  const error =
    "error" in healthpointLocationsResult
      ? healthpointLocationsResult.error
      : null;
  const healthpointLocations =
    "value" in healthpointLocationsResult
      ? healthpointLocationsResult.value
      : [];

  // useEffect(() => {
  //   async function load() {
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       setHealthpointLocations(await getHealthpointData());
  //     } catch (e) {
  //       setError(e as Error);
  //     }
  //     setLoading(false);
  //   }
  //   load();
  // }, []);

  const locations = [...healthpointLocations, ...crowdsourcedLocations];

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!locations.length) {
    return <p>No locations found</p>;
  }

  const location = locations.find(
    (loc) => simpleHash(`${loc.lat}${loc.lng}`) === hash
  );

  if (!location) {
    return (
      <p>
        {slug}|{hash}
      </p>
    );
  }

  return (
    <>
      {"isHealthpoint" in location ? (
        <WalkModal
          clearSelectedLocation={() => history.push(`/${getSearch()}`)}
          location={location as HealthpointLocation}
        />
      ) : (
        <CrowdsourcedModal
          clearSelectedLocation={() => history.push(`/${getSearch()}`)}
          location={location as CrowdsourcedLocation}
        />
      )}
    </>
  );
}
