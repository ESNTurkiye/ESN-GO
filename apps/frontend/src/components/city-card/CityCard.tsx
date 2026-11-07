import Image from "next/image";
import Link from "next/link";
import type { City } from "@/lib/api";
import styles from "./CityCard.module.scss";

type CityCardProps = {
    city: City;
    /** next/image sizes: how wide the card is on each screen. */
    sizes: string;
};

/**
 * CityCard (standard: Bileşenler; wireframe /destinations note 3): real photo, dark layer,
 * region label, city name in large type, ESN section count. The whole card is one link.
 * Used on "/" (Pick a destination) and on /destinations.
 */
export function CityCard({ city, sizes }: CityCardProps) {
    const sections = city.sectionCount ?? 0;

    return (
        <Link href={`/destinations/${city.cityId}`} className={styles.card}>
            {city.coverImage && <Image className={styles.photo} src={city.coverImage.url} alt="" fill sizes={sizes} />}
            <div className={styles.body}>
                {city.region && <span className={styles.region}>{city.region}</span>}
                <h3 className={styles.name}>{city.name}</h3>
                {sections > 0 && (
                    <p className={styles.meta}>
                        {sections} ESN {sections === 1 ? "section" : "sections"}
                    </p>
                )}
            </div>
        </Link>
    );
}
