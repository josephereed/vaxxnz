import { Trans, useTranslation } from "react-i18next";
import { ShareButtons } from "./ShareButtons";
import { enqueueAnalyticsEvent } from "./utils/analytics";
import { useState } from "react";
import TermsAndConditionsModal from "./TermsAndConditionsModal";
import PrivacyPolicyModal from "./PrivacyPolicyModal";
import CookiesPolicyModal from "./CookiesPolicyModal";

export function Footer() {
  const { t } = useTranslation("common");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TermsAndConditionsModal
        termsAndConditionsIsOpen={isOpen}
        setTermsAndConditionsIsOpen={setIsOpen}
      />
      <PrivacyPolicyModal
        privacyPolicyIsOpen={isOpen}
        setPrivacyPolicyIsOpen={setIsOpen}
      />
      <CookiesPolicyModal
        cookiesPolicyIsOpen={isOpen}
        setCookiesPolicyIsOpen={setIsOpen}
      />

      <footer className="footer-header">
        <p style={{ marginBottom: "0.5rem" }}>{t("footer.message")}</p>
        <div className={"social-container"}>
          <ShareButtons />
        </div>
        <br />
        <p>
          <Trans
            i18nKey="footer.addressFinderLinkCopy"
            t={t}
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            components={[<a href="https://addressfinder.nz"></a>]}
          />
        </p>
        <br />
        <p>
          <a
            href="https://airtable.com/shrxuw3vSp2yRPrG7"
            target="_blank"
            rel="noreferrer"
          >
            {t("footer.links.contactUs")}
          </a>{" "}
          /{" "}
          <a
            href="https://github.com/CovidEngine/vaxxnz/projects/2"
            target="_blank"
            rel="noreferrer"
            onClick={() => enqueueAnalyticsEvent("Roadmap clicked")}
          >
            {t("footer.links.roadmap")}
          </a>{" "}
          /{" "}
          <a
            href="https://github.com/CovidEngine/vaxxnz/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noreferrer"
          >
            {t("navigation.getInvolved")}
          </a>
          <br />{" "}
          <a
            href="https://github.com/CovidEngine/vaxxnzlocations"
            target="_blank"
            rel="noreferrer"
            onClick={() => enqueueAnalyticsEvent("Raw data clicked")}
          >
            {t("footer.links.rawData")}
          </a>{" "}
          /{" "}
          <a
            href="https://github.com/CovidEngine/vaxxnz"
            target="_blank"
            rel="noreferrer"
            onClick={() => enqueueAnalyticsEvent("Source code clicked")}
          >
            {t("footer.links.sourceCode")}
          </a>{" "}
          /{" "}
          <a
            href="https://twitter.com/vaxxnz"
            target="_blank"
            rel="noreferrer"
            onClick={() => enqueueAnalyticsEvent("Twitter Clicked")}
          >
            Twitter
          </a>{" "}
        </p>
        <p>
          <a
            href="javascript:void(0)"
            onClick={() => {
              enqueueAnalyticsEvent("Terms and Conditions clicked");
              setIsOpen(true);
            }}
          >
            Terms and Conditions
          </a>{" "}
          /{" "}
          <a
            href="javascript:void(0)"
            onClick={() => {
              enqueueAnalyticsEvent("Privacy policy clicked");
              setIsOpen(true);
            }}
          >
            Privacy Policy
          </a>{" "}
          /{" "}
          <a
            href="javascript:void(0)"
            onClick={() => {
              enqueueAnalyticsEvent("Cookies clicked");
              setIsOpen(true);
            }}
          >
            Cookies Policy
          </a>
        </p>
      </footer>
    </>
  );
}
