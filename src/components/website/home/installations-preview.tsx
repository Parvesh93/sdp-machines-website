"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
} from "lucide-react";

const locations = [
  "Kishangarh",
  "Hosur",
  "Krishnagiri",
  "Ongole",
  "Karimnagar",
];

const stats = [
  {
    value: "1,000+",
    label: "Installations",
  },
  {
    value: "5",
    label: "Service Centres",
  },
  {
    value: "1995",
    label: "Engineering Since",
  },
];

export function InstallationsPreview() {
  return (
    <section className="installations-preview">
      <div className="installations-preview-inner">
        <div className="installations-preview-head">
          <div>
            <span className="section-index">
              03 / Field Proof
            </span>

            <h2>
              Built in Ajmer.
              <span>
                Running where stone is processed.
              </span>
            </h2>
          </div>

          <div className="installations-preview-intro">
            <p>
              Machines prove themselves on the
              factory floor. SDP installations
              operate across India&apos;s major
              stone-processing clusters.
            </p>

            <Link
              href="/installations"
              className="machine-explore-link"
            >
              View installations

              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>

        <div className="installations-preview-layout">
          <div className="installations-preview-image">
            <Image
              src="/images/installations/installation-01.jpeg"
              alt="SDP machine installed at a stone processing facility"
              fill
              sizes="(max-width: 900px) 100vw, 65vw"
              className="installations-preview-img"
            />

            <div className="installation-image-overlay" />

            <div className="installation-image-meta">
              <span>
                Installation / India
              </span>

              <strong>
                Machines in production
              </strong>
            </div>
          </div>

          <div className="installations-preview-side">
            <div className="installations-stats">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="installation-stat"
                >
                  <strong>
                    {stat.value}
                  </strong>

                  <span>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="installation-locations">
              <span className="installation-locations-label">
                Stone processing clusters
              </span>

              <div className="installation-location-list">
                {locations.map(
                  (location, index) => (
                    <div
                      key={location}
                      className="installation-location"
                    >
                      <span>
                        0{index + 1}
                      </span>

                      <strong>
                        {location}
                      </strong>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}