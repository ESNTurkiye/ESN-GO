# Feature #26: ESN Office Map System

## 📋 Overview

ESN Office Map System is a map visualization system that displays ESN Türkiye's event and sales points on an interactive map, provides real-time status tracking, and enables dynamic data management through Google Sheets integration.

**Branch:** `feature/26-esn-office-map`

---

## 🎯 Key Features

### 1. **Interactive Map with Real-time Status**
- Leaflet.js-based interactive map
- Real-time status display for event points (Active/Upcoming/Closed)
- Dynamic zoom and automatic focus (fitBounds)
- Custom markers with color-coded status display

### 2. **Timezone-Aware Status System**
- **Problem Solved:** Users in different timezones can see correct status based on Türkiye time (Europe/Istanbul)
- ISO 8601 format timezone-aware date/time processing
- Users always see Türkiye time displayed

### 3. **Google Sheets Integration**
- Backend API route to fetch data from Google Sheets
- Service Account authentication
- Automatic data synchronization
- Real-time data instead of mock data

### 4. **Internationalization (i18n)**
- Turkish and English language support
- All UI texts are localized
- Dynamic language switching support

### 5. **Instagram Integration**
- Clickable Instagram links on PIC (Person In Charge) names
- Conditional rendering (link if Instagram exists, otherwise plain text)

### 6. **Responsive Design & Accessibility**
- Mobile-first approach
- ESN Visual Identity System compliant design
- Accessibility best practices (aria-labels, semantic HTML)

---

## 📁 New Files

### Backend
- `src/app/api/offices/route.ts` - Google Sheets API route

### Frontend Components
- `src/components/map/MapCaller.tsx` - Main map component
- `src/components/map/types.ts` - TypeScript type definitions
- `src/components/sections/MapSection.tsx` - Map section wrapper component
- `src/components/sections/skeletons/MapSectionSkeleton.tsx` - Loading skeleton

### Utilities
- `src/lib/dateHelpers.ts` - Timezone-aware date utilities

### Pages
- `src/app/map/page.tsx` - Map page

### Data
- `public/data/mockOffices.json` - Mock data (for development, not used in production)

### Translations
- `src/i18n/locales/tr.json` - Turkish translations (map section added)
- `src/i18n/locales/en.json` - English translations (map section added)

---

## 🔧 Problems Solved and Technical Details

### 1. ⏰ Timezone Issue

**Problem:** 
When a user was in a different timezone (e.g., New York), event statuses were displayed incorrectly. For example, an event starting at 15:00 in Türkiye would appear to start at 08:00 for a user in New York.

**Solution:**
- `getOfficeStatus()` function in `dateHelpers.ts` performs timezone-aware date comparison using ISO 8601 format
- `formatTimeTR()` function always formats dates using `Europe/Istanbul` timezone
- Regardless of the user's local timezone, correct status is displayed based on Türkiye time

**Code Example:**
```typescript
// Logic: Compare using universal time
export const getOfficeStatus = (startIso: string, endIso: string): OfficeStatus => {
  const now = new Date(); // UTC
  const start = new Date(startIso); // Convert ISO string to UTC
  const end = new Date(endIso);
  
  if (now < start) return "upcoming";
  if (now >= start && now <= end) return "active";
  return "closed";
};

// Display: Always show Türkiye time
export const formatTimeTR = (isoString: string): string => {
  return new Intl.DateTimeFormat('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Istanbul', // Critical: Always Türkiye time
  }).format(new Date(isoString));
};
```

**Result:** 
- ✅ Correct status display regardless of user location
- ✅ Türkiye time always displayed on screen
- ✅ Timezone information preserved through ISO 8601 format from backend

---

### 2. 🗺️ Static Coordinates Issue

**Problem:**
The map was fixed only to Çanakkale. Events in different cities like Istanbul and Ankara could not be displayed.

**Solution:**
- Dynamic zoom implementation using `fitBounds` method
- `MapController` component for automatic zoom covering all markers
- Default center set to Türkiye general (Ankara)

**Code Example:**
```typescript
const MapController = ({ locations }: { locations: Office[] }) => {
  const map = useMap();
  
  useEffect(() => {
    if (locations.length === 0) return;
    
    const points = locations.map(
      (loc) => [loc.coordinates.lat, loc.coordinates.lng] as [number, number]
    );
    
    const bounds = L.latLngBounds(points);
    
    map.fitBounds(bounds, {
      padding: [50, 50],
      maxZoom: 15,
      animate: true,
      duration: 1,
    });
  }, [locations, map]);
  
  return null;
};
```

**Result:**
- ✅ Events in all cities automatically displayed
- ✅ Map automatically zooms to cover all markers
- ✅ Dynamic map suitable for ESN's national structure

---

### 3. 🎨 Hardcoded Colors Issue

**Problem:**
Hardcoded hex colors (`#00aeef`, `#f47b20`) were used, not compliant with ESN Visual Identity System.

**Solution:**
- Use of ESN CSS variables (`bg-esn-cyan`, `bg-esn-orange`)
- Consistent color management with Tailwind utility classes
- Hex usage in inline styles for marker icons (Leaflet requirement)

**Result:**
- ✅ ESN Visual Identity Manual compliant color usage
- ✅ Consistent color management
- ✅ Easy color updates (via CSS variables)

---

### 4. 📱 Header Overlap Issue

**Problem:**
Fixed header was overlapping MapSection content. Badge and title were hidden behind the header.

**Solution:**
- Added top padding with `mt-8` class
- Consistency with other sections maintained

**Result:**
- ✅ Correct spacing between header and content
- ✅ All content visible and accessible

---

### 5. 🔄 Mock Data → Real Data Migration

**Problem:**
Mock JSON file was used, requiring code changes for data updates.

**Solution:**
- Google Sheets API integration
- Backend API route (`/api/offices`)
- Dynamic data fetching with `useState` and `useEffect` in frontend
- Loading state and error handling

**Code Example:**
```typescript
const [offices, setOffices] = useState<Office[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchOffices = async () => {
    try {
      const res = await fetch('/api/offices');
      if (!res.ok) throw new Error('Data not received');
      const data = await res.json();
      setOffices(data);
    } catch (err) {
      console.error('Error loading map data:', err);
      setOffices([]);
    } finally {
      setLoading(false);
    }
  };
  
  fetchOffices();
}, []);
```

**Result:**
- ✅ Changes in Google Sheets automatically reflected on map
- ✅ Data updates without code changes
- ✅ Non-technical users can update data

---

## 🏗️ Architecture and Structure

### Component Hierarchy
```
MapPage (page.tsx)
└── MapSection (sections/MapSection.tsx)
    └── MapCaller (map/MapCaller.tsx)
        ├── MapController (internal component)
        ├── TileLayer
        └── Marker[] (for each office)
            └── Popup
```

### Data Flow
```
Google Sheets
    ↓
API Route (/api/offices)
    ↓
MapCaller Component (useState)
    ↓
MapController (fitBounds)
    ↓
Marker Components (render)
```

### State Management
- **Offices Data:** `useState<Office[]>` - Data from API
- **Loading State:** `useState<boolean>` - Loading status
- **Language:** `useLanguage()` hook - Localization

---

## 🔐 Environment Variables

Required variables in `.env.local` file:

```env
GOOGLE_SHEETS_ID=your_sheet_id
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@email.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
```

---

## 📊 Google Sheets Format

Column order in Sheet (starting from A2):

| Column | Content | Format | Example |
|-------|--------|--------|---------|
| A | ID | Number | 101 |
| B | Event Name | String | "Halloween Party Ticket Sale" |
| C | Location Label | String | "Çanakkale - Troy Heykeli" |
| D | PIC | String | "Berkay Kıran" |
| E | Instagram | String (optional) | "berkaykirannn" |
| F | Lat | Number | 40.1553 |
| G | Lng | Number | 26.4142 |
| H | Start Time | ISO 8601 | "2025-10-31T14:00:00+03:00" |
| I | End Time | ISO 8601 | "2025-10-31T18:00:00+03:00" |
| J | Note | String (optional) | "If it rains..." |
| K | Type | String | "party" / "trip" / "info" / "sale" |

---

## 🎨 UI/UX Features

### Status Colors
- **Active:** ESN Cyan (`#00aeef`) - Blue marker and badge
- **Upcoming:** ESN Orange (`#f47b20`) - Orange marker and badge
- **Closed:** Gray (`#9ca3af`) - Gray marker and badge

### Popup Content
- Event name (bold, large)
- Location label
- Time range (monospace font, Türkiye time)
- Status badge (color-coded)
- Note (if exists, italic)
- Responsible person (clickable if Instagram link exists)

### Loading States
- Loading display with skeleton component
- Localized loading messages
- Graceful degradation with error handling

---

## 🌍 Internationalization

### Translation Keys

```json
{
  "map": {
    "badge": "Events & Locations" / "Etkinlikler & Konumlar",
    "title": "ESN Event Locations" / "ESN Etkinlik Noktaları",
    "subtitle": "...",
    "loading": "Loading map..." / "Harita yükleniyor...",
    "status": {
      "active": "Active" / "Aktif",
      "upcoming": "Upcoming" / "Yakında",
      "closed": "Closed" / "Kapalı"
    },
    "popup": {
      "responsible": "Responsible" / "Sorumlu"
    }
  }
}
```

---

## 🧪 Testing Checklist

- [x] Do users in different timezones see correct status?
- [x] Is data fetched from Google Sheets?
- [x] Does loading state work properly?
- [x] Does error handling work?
- [x] Does dynamic zoom cover all markers?
- [x] Do Instagram links work?
- [x] Does localization work?
- [x] Is it mobile responsive?
- [x] Is header overlap issue resolved?

---

## 📝 Usage Notes

### Development
- Mock data available in `public/data/mockOffices.json` file
- Google Sheets credentials required when testing API route

### Production
- Environment variables must be set in production environment
- Google Service Account must have access permission to Sheet
- Next.js revalidation can be used for API route caching

### Maintenance
- If Google Sheets format changes, API route mapping must be updated
- Map will automatically zoom when new cities are added
- Timezone changes (daylight saving time) are automatically handled

---

## 🚀 Deployment Notes

1. Environment variables must be added to production
2. Google Service Account must be granted Sheet access permission
3. API route rate limiting should be checked
4. Logging can be added for error monitoring

---

## 📚 References

- [Leaflet.js Documentation](https://leafletjs.com/)
- [React Leaflet Documentation](https://react-leaflet.js.org/)
- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [ESN Visual Identity Manual 2023](Visual%20Identity%20Manual%20-%202023.pdf)
- [Next.js App Router API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

## 🚀 Next Steps & Future Enhancements

The current Google Sheets solution is excellent for an **MVP (Minimum Viable Product)**. It's fast, free, and gets the job done.

However, when you build a robust backend structure (like **.NET Core + PostgreSQL**), the game changes. Your project evolves from a simple map viewer into a full-featured **Location-Based Service (LBS)**.

Here are the enhancements you can implement with a real backend that will take the project to the "Next Level":

### 1. Geographic Database and Queries (PostGIS) 🌍

Currently, without a backend, you have to fetch all data to the frontend and filter it in the browser. With thousands of events, the browser would freeze.

* **What to Do:** Use PostgreSQL's **PostGIS** extension.
* **Feature:** **"Near Me" Feature.**
* Get the user's location and send it to the backend.
* Backend executes a single SQL query: *"Get me active events within 500 meters of the user."*
* Only relevant data comes back, performance soars.

**Benefits:**
- Efficient spatial queries
- Scalable to thousands of events
- Reduced frontend load
- Better user experience

---

### 2. Automatic Location Finding (Geocoding) 📍

Currently, you manually enter latitude/longitude (40.1553...) into Google Sheets. This is tedious and error-prone.

* **What to Do:** Integrate a Geocoding service (Google Places API or OpenCage) into the backend.
* **Feature:** Admin types "Troy Heykeli" in the admin panel and clicks save.
* Backend queries the service in the background, gets coordinates, and automatically saves to database. No more coordinate searching hassle.

**Benefits:**
- Eliminates manual coordinate entry
- Reduces errors
- Faster data entry
- Better data accuracy

---

### 3. Real-time Updates (SignalR / WebSocket) ⚡

Currently, when someone changes the time, users need to refresh the page (F5).

* **What to Do:** Use .NET's popular library **SignalR**.
* **Feature:**
* When "Cancel Event" button is pressed in the admin panel, **within milliseconds**, the pin on everyone's map viewing screen **instantly turns red** or disappears. No page refresh needed.
* **Live Location Tracking:** For example, in a "Pub Crawl" event, you can show the group's current location live (like Uber taxi icon) moving on the map.

**Benefits:**
- Real-time synchronization
- Better user experience
- Live updates without refresh
- Enables live tracking features

---

### 4. Advanced Authorization (RBAC - Role Based Access Control) 🛡️

Currently, anyone with the Google Sheet link can delete everything.

* **What to Do:** JWT (JSON Web Token) based Auth system.
* **Feature:**
* **Admin:** Can do everything.
* **Event Manager:** Can only edit events they created.
* **User:** Can only view and mark "Going".

**Benefits:**
- Secure data management
- Granular permissions
- Better security
- Scalable user management

---

### 5. Gamification and Check-in 🏆

ESN students love competition. With a backend, you can track users.

* **Feature:**
* When a student physically approaches "Troy Heykeli" location (within 50 meters according to GPS), the **"Check-in"** button becomes active on their phone.
* After check-in, they earn points. You can create a leaderboard: "Erasmus student who attended most events this month."

**Benefits:**
- Increased engagement
- Community building
- User retention
- Fun competitive element

---

### 6. Clustering 🔴

When the number of events increases (e.g., 50 venues side by side in Istanbul), the map becomes a pin cemetery.

* **What to Do:** Backend (or frontend library) combines points that are very close to each other.
* **Feature:** Instead of showing 10 overlapping pins on the map, show a colored circle with "10" written on it. Clicking opens it (Spiderfy).

**Benefits:**
- Better map readability
- Improved performance
- Better UX with many markers
- Cleaner visual presentation

---

### 7. Analytics and Reporting 📊

You can't see who viewed what and when in Google Sheets.

* **What to Do:** Logging.
* **Feature:**
* "Which location gets the most clicks?"
* "What times do students use the map most?"
* Use this data to plan future events more strategically.

**Benefits:**
- Data-driven decisions
- Better event planning
- User behavior insights
- Performance metrics

---

### Recommended Roadmap 

1. **Open a .NET Core Web API** project (with Clean Architecture).
2. **Set up PostgreSQL** database and create `Events` table.
3. **Connect to database** with Entity Framework Core.
4. Convert current Google Sheets code to a structure where "data is entered from Admin Panel".


**Implementation Priority:**
1. ✅ **Phase 1 (Current):** Google Sheets MVP - DONE
2.  **Phase 2:** .NET Core API + PostgreSQL + Admin Panel
3.  **Phase 3:** PostGIS + Geocoding
4.  **Phase 4:** SignalR Real-time Updates
5.  **Phase 5:** RBAC + Authentication
6.  **Phase 6:** Gamification + Check-in
7.  **Phase 7:** Analytics + Clustering

---

## 👥 Contributors

- Feature development: ESN Türkiye Development Team
- Branch: `feature/26-esn-office-map`

---

**Last Updated:** 28-12-2025
**Status:** ✅ Ready for Production
