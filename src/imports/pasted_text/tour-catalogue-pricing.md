Color Palette
Deep Marine Navy (Primary Dark): #001844 / #001D4A (Used for headers, main badges, footer, high-contrast text)
Cerulean Ocean Blue (Primary Brand): #0060B6 (Buttons, active states, key icons, highlights)
Caribbean Teal (Secondary Accent): #00A896 / #028090 (Script subheadings, snorkel badges, water highlights)
Sunset Coral (Action & CTA Accent): #FF6F59 (Book buttons, alert tags, price badges, bullet dots)
Clean Sand / Soft Off-White (Canvas): #F8FAFC / #FFFFFF (Card backgrounds, clean spacing)
Typography
Brand Headings: Montserrat / Plus Jakarta Sans (Weight: 800 or 900 Extra Bold/Black, uppercase tracking)
Location Tagline ("Bocas Del Toro"): Pacifico, Kaushan Script, or Caveat (Brush script style, coral or teal)
Body & UI: Inter or Plus Jakarta Sans (16px base, 1.5 line height, clear legibility)
Logo / Emblem Specification
Roundel badge featuring a dark navy circle (#001844) with a white outer ring.
Centered bold capital "B" entwined with a surging wave barrel cresting over the top from left to right, finished with 3 splash droplets on the upper right.
2. Complete Tour Catalogue, Schedules & Pricing
General Operating Rules
Standard Day Tours: 9:30 AM – 4:30 PM (7 Hours)
Bioluminescence Night Tour: 7:30 PM – 9:30 PM (2 Hours)
Included in all Day Tours: USCG-approved life jackets, high-grade snorkel gear & masks, cooler with ice & bottled water, licensed bilingual captain & local guide, safety briefing.
Tour 1: Cayo Zapatilla & Sloth Island (The Signature Expedition)
Schedule: 9:30 AM – 4:30 PM
Shared Group Price: $35.00 USD per person
Private Boat Charter: **
30/extra person)
Stops & Highlights:
Dolphin Bay (wild bottlenose dolphin watching)
Coral Cay / Cayo Coral (shallow reef snorkeling & overwater seafood lunch stop)
Cayo Zapatilla #2 (Isla Bastimentos National Marine Park exploration & white sand beaches)
Sloth Island / Hollywood Channel (mangrove wildlife spotting & starfish shallows)
Notes: National Park entrance fee ($10 for tourists / $3 for residents) paid in cash at park ranger station.
Tour 2: Isla Pájaros & Starfish Beach (Bocas North Coast)
Schedule: 9:30 AM – 4:30 PM
Shared Group Price: $35.00 USD per person
Private Boat Charter: $220.00 USD (up to 6 guests)
Stops & Highlights:
Isla Pájaros / Bird Island (open-ocean rocky bird sanctuary & red-billed tropicbirds)
Boca del Drago (tranquil Caribbean bay & lunch stop)
Playa Estrella / Starfish Beach (giant sea stars viewing & calm turquoise shallows)
Mangrove channel scenic cruise back to Isla Colón.
Tour 3: Red Frog Beach & Hospital Point Adventure
Schedule: 9:30 AM – 4:30 PM
Shared Group Price: $30.00 USD per person
Private Boat Charter: $190.00 USD (up to 6 guests)
Stops & Highlights:
Hospital Point reef (coral wall snorkeling & sea turtles)
Solarte Island mangrove tour
Red Frog Beach (Bastimentos rainforest hike & poison dart frogs spot)
Punta Vieja reef snorkel.
Tour 4: Dolphin Bay & Coral Cay Snorkeling Safari
Schedule: 9:30 AM – 4:30 PM
Shared Group Price: $30.00 USD per person
Private Boat Charter: $190.00 USD (up to 6 guests)
Stops & Highlights:
Laguna Bocatorito (Dolphin Bay peaceful observation)
Coral Cay Snorkel Gardens (brain corals, parrotfish, rays)
Overwater restaurant stop for fresh lobster/fish lunch
Shallow mangrove wildlife observation.
Tour 5: Escudo de Veraguas Extreme Wilderness Expedition
Schedule: 6:30 AM – 5:00 PM (Special Long-Range Tour)
Shared Group Price: $130.00 USD per person (Min 6 passengers)
Private Boat Charter: $750.00 USD (Twin-engine safety boat, up to 6 guests)
Stops & Highlights:
2-hour offshore cruise to the remote outer jewel of the Caribbean
Pygmy 3-toed sloth spotting in endemic jungles
Blue lagoon cave swimming & pristine untouched reefs
Uninhabited white sand sandbars.
Tour 6: Isla San Cristóbal & Cocoa Farm Cultural Tour
Schedule: 9:30 AM – 4:30 PM
Shared Group Price: $45.00 USD per person (includes farm entry & tasting)
Private Boat Charter: $250.00 USD (up to 6 guests)
Stops & Highlights:
Indigenous Ngäbe community visit
Organic cacao & artisanal chocolate making demonstration
Rainforest botanical medicinal plant walk
Reef snorkeling in calm Laguna Bocatorito channels.
Tour 7: Mimbi Timbi & Secret North Reefs (Hidden Gem)
Schedule: 9:30 AM – 4:30 PM
Shared Group Price: $40.00 USD per person
Private Boat Charter: $240.00 USD (up to 6 guests)
Stops & Highlights:
Blue Lagoon natural sea pool
Secret sea caves & blowholes on Bastimentos rugged north shore
Virgin coral reefs with zero tourist crowds
Remote picnic on secluded cove.
Tour 8: Deep Sea & Inshore Sport Fishing
Schedule: 9:30 AM – 4:30 PM (or custom half-day 4 hours)
Private Charter Only: 
550.00 USD (Full Day)
Includes: Professional rods, Penn/Shimano reels, live bait, lures, cooler, captain who knows local drop-offs.
Target Species: Wahoo, Mahi-Mahi (Dorado), Yellowfin Tuna, Kingfish, Snapper, and Tarpon.
Tour 9: Bioluminescent Lagoon Night Tour
Schedule: 7:30 PM – 9:30 PM (2 Hours)
Shared Group Price: $25.00 USD per person
Private Boat Charter: $150.00 USD (up to 6 guests)
Stops & Highlights:
Stargazing cruise departing from Bocas Town dock after dusk
Entrance into pitch-black mangrove lagoon
Swimming & swirling in glowing dinoflagellate bioluminescence
Light trails in the dark water.
3. Booking & Checkout UX Architecture (Critical Rule)
The Problem to Avoid:
❌ DO NOT show a generic dropdown inside the booking modal that lists all 9 tours when the customer already clicked "Book" on a specific tour. It causes confusion and accidental wrong bookings.
The Required Pattern (Dedicated Tour-Locked Booking Flow):
Direct Trigger: Each tour card has an explicit "Book This Tour" button passing tourId (e.g. onOpenBooking('tour-1-cayo-zapatilla')).
Locked Tour Header: When the modal opens:
Display a bold, unchangeable summary card for the chosen tour (Tour Name, Schedule badge e.g. 9:30 AM - 4:30 PM, Price per person).
Display a small "← Choose different tour" link only if they want to cancel and go back to the catalog.
Interactive Step-by-Step Inputs:
Booking Type Toggle: [ Shared Tour ($35/person) ] vs [ Private Boat Charter ($220 total) ]
Guest Stepper: Number of adults & children with dynamic price computation (Passengers × Price = Subtotal).
Date Picker: Calendar date selector (minimum: today + 1 day).
Lead Passenger Info: Full Name, WhatsApp Number (with country code), Email Address, Hotel/Pickup dock in Bocas Town.
Special Add-ons / Requests: Snorkel gear sizes, vegetarian lunch preference, cooler drinks request.
Instant Transparent Breakdown:
Subtotal (Tours & boat)
Estimated cash park fees (clearly labeled e.g. "+$10/person paid directly at Park Ranger booth").
Total deposit or balance due.
Direct Checkout Dispatch:
Primary Action (WhatsApp): Generates a pre-formatted message sent directly to +507 6828-5683 with all details (Tour Name, Date, Passengers, Shared/Private, Total Price).
Secondary Action (Email / Card Reserve): Dispatches a confirmation payload to oceanbluebocas@gmail.com.
4. Search Engine Optimization (SEO) & Keywords
Primary Target Keywords (English)
bocas del toro boat tours
cayo zapatilla tour price
best boat tours bocas del toro panama
bioluminescence night tour bocas del toro
private boat charter bocas del toro
dolphin bay coral cay snorkeling bocas
starfish beach bird island boat trip
escudo de veraguas expedition tour
Primary Target Keywords (Spanish)
tours en lancha bocas del toro
tour cayo zapatilla precio panama
tour bioluminiscencia bocas del toro
alquiler lancha privada bocas del toro
excursiones maritimas bocas del toro
tour avistamiento delfines y snorkel