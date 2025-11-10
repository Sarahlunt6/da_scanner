[Digital Authority Calculator PRD.md](https://github.com/user-attachments/files/23458705/Digital.Authority.Calculator.PRD.md)
---

# **DIGITAL AUTHORITY SCANNER \- PRODUCT REQUIREMENTS DOCUMENT**

**Version:** 1.0  
 **Product Owner:** Sarah Lunt / Opkie  
 **Date:** November 2025  
 **Target Market:** Dental practices ($750K-$2M annual revenue)  
 **Primary Goal:** Generate 20 qualified sales appointments per month

---

## **EXECUTIVE SUMMARY**

### **Product Purpose**

The Digital Authority Scanner is a lead generation diagnostic tool that identifies specific gaps in a dental practice's online presence and converts prospects into qualified sales calls for the TAPS (Trusted Authority Profile System) service.

### **Core Value Proposition**

"Find out why high-value patients aren't finding you—and what the top 5% of practices do differently."

### **Competitive Differentiation**

* **Only tool** mapping directly to the proprietary TAPS framework  
* Uses TAPS-branded terminology throughout (not generic SEO language)  
* Exclusive territory positioning (one practice per area)  
* Authoritative expert tone vs. friendly salesperson approach  
* Focus on attracting high-value cases (implants, veneers, Invisalign)  
* 2X ROI guarantee messaging

### **Key Success Metrics**

* Target conversion rate: 15-20% scan-to-call-booked  
* Email capture rate: 85%+  
* Average Digital Authority Score: 65-70% (intentionally harsh)  
* Expected score distribution: \<5% score 90%+, \~40% score 60-74%

---

## **TARGET AUDIENCE**

### **Practice Profile**

* **Size:** Solo practitioners and 2-3 dentist practices (NOT large groups or DSOs)  
* **Revenue:** $750,000 \- $2,000,000 annually  
* **Geography:** United States, exclusive territories

### **Psychographic Profile**

**Current State:**

* Frustrated with ineffective marketing  
* Burned by previous agencies ("spent $20K on website, rankings dropped")  
* Distrustful of generic marketing advice  
* Time-starved, needs "done-for-you" solutions

**Knowledge Level:**

* Knows their "Google listing" exists (might not call it "GBP")  
* Aware reviews matter, unaware of velocity as ranking factor  
* Understands symptoms ("competitor ranks above me") but not technical diagnoses

**Common Objections:**

* "They don't understand my practice"  
* "It's overpriced with no guaranteed ROI"  
* "I've been burned before"  
* "I'm too busy to manage another vendor"

**Aspirational State:**

* Wants to attract high-value cases (implants, veneers, Invisalign)  
* Seeks reduced dependence on insurance-driven work  
* Desires clear, measurable results without long-term contracts

---

## **PRODUCT FEATURES \- SCORING SYSTEM**

### **Overall Scoring Formula**

**Overall Digital Authority Score \= (Phase 1 × 0.50) \+ (Phase 2 × 0.35) \+ (Phase 3 × 0.15)**

### **Intentionally Harsh Calibration**

The scoring is designed so that very few practices score above 90%, creating urgency:

* 90-100%: \<5% of practices (the elite)  
* 75-89%: \~15% of practices (competitive but gaps remain)  
* 60-74%: \~40% of practices (functional but losing to competitors)  
* Below 60%: \~40% of practices (urgent issues)

---

## **PHASE 1: THE FOUNDATIONAL SPRINT (50% of total score)**

### **Module 1.1: Profit Zone Optimization (10% weight)**

**Data Source:** Google Places API  
 **What We Check:** GBP primary and secondary categories  
 **UI Label:** "Profit Zone" (NOT "GBP Categories")

**Scoring Logic:**

* 100 points: "Dentist" primary \+ "Cosmetic Dentist" \+ "Dental Implants Periodontist" \+ relevant specialties  
* 75 points: "Dentist" primary \+ 1-2 relevant secondary categories  
* 50 points: "Dentist" primary only  
* 25 points: Incorrect or missing primary category

**Gap Message Example:** "You're only listed as 'Dentist'—missing 'Cosmetic Dentist' and 'Dental Implants Periodontist' categories that high-value patients search for."

### **Module 1.2: Product Shelf Setup (10% weight)**

**Data Source:** Google Places API  
 **What We Check:** Services listed on GBP  
 **UI Label:** "Product Shelf" (NOT "GBP Services")

**Scoring Logic:**

* 100 points: 15-20 services listed, including all high-value procedures  
* 75 points: 10-14 services listed  
* 50 points: 5-9 services listed  
* 25 points: \<5 services listed

**Gap Message Example:** "You're missing 12 critical services. Google is 60% less likely to show your practice for 'dental implants near me' searches."

### **Module 1.3: Review Boost & Velocity (20% combined weight)**

**Review Health (15% weight):**

* **Data Source:** Google Places API  
* **What We Check:** Star rating \+ total review count

**Scoring Logic:**

* 100 points: 4.8+ stars AND 100+ reviews  
* 75 points: 4.5+ stars AND 50+ reviews  
* 50 points: 4.0+ stars AND 25+ reviews  
* 25 points: Below 4.0 stars OR \<25 reviews

**Review Velocity (5% weight):**

* **Data Source:** Google Places API (5 most recent reviews)  
* **Method:** Count how many of the 5 most recent reviews occurred in last 90 days

**Scoring Logic:**

* 100 points: 4-5 of the 5 recent reviews in last 90 days  
* 60 points: 2-3 of the 5 recent reviews in last 90 days  
* 30 points: 0-1 of the 5 recent reviews in last 90 days

**Owner Response Rate:**

* Calculate percentage of reviews with owner responses  
* Displayed to user, contributes to overall review health score

**UI Labels:** "Review Boost" (current state) \+ "Consistent Review System" (velocity)

### **Module 1.4: NAP Consistency (10% weight)**

**Data Sources:**

* Google Places API  
* Yelp Fusion API  
* Web scraping: Bing Places, Apple Maps, Facebook, Healthgrades, Zocdoc

**What We Check:** Name, Address, Phone match across 7 directories

**Scoring Logic:**

* 100 points: 7/7 directories match exactly  
* 85 points: 6/7 directories match  
* 70 points: 5/7 directories match  
* 50 points: 4/7 directories match  
* 25 points: \<4/7 directories match

**UI Label:** "NAP Consistency Check"

**Gap Message Example:** "Your address format varies across 4 directories. This 'confuses' Google's algorithm and directly lowers your map ranking."

---

## **PHASE 2: THE ASSET ENGINE (35% of total score)**

### **Module 2.1: The Core 30 (20% weight)**

**Data Source:** HTTP HEAD requests to practice website  
 **What We Check:** Presence of 30 critical authority pages  
 **UI Label:** "Core 30 Authority Asset" (NOT "Website Architecture")

**Target Pages Include:**

* Philosophy of Care (/philosophy, /our-philosophy, /about/philosophy, /approach)  
* Team Pages (/team, /our-team, /about/team, /meet-the-team, /dentists)  
* Community Involvement (/community, /community-involvement, /giving-back, /volunteer)  
* Patient Reviews (/reviews, /testimonials, /patient-testimonials)  
* Procedure Pages (implants, veneers, Invisalign, sedation, etc.)  
* Educational Content (FAQs, blog, resources)  
* Trust Signals (privacy policy, financing, insurance, technology)

**Scoring Logic:**

* 100 points: 27-30 pages found  
* 75 points: 20-26 pages found  
* 50 points: 13-19 pages found  
* 25 points: \<13 pages found

**Gap Message Example:** "You're missing 18 of the Core 30 pages. Practices with complete 'Core 30' sites convert 2.4x more web visitors into consultations."

### **Module 2.2: Technical Trust Signals (15% weight)**

**Data Sources:**

* SSL Check: OpenSSL verification  
* Mobile Score: Google PageSpeed API  
* Load Time: Google PageSpeed API  
* Schema Markup: HTML parsing for application/ld+json

**Component Scoring (each 25% of this module):**

1. **SSL Certificate (HTTPS):** 25% of module

   * Has SSL \= full points  
   * No SSL \= 0 points  
2. **Mobile Performance Score:** 25% of module

   * 90+ \= full points  
   * 70-89 \= 60% of points  
   * \<70 \= 30% of points  
3. **Page Load Time:** 25% of module

   * \<3 seconds \= full points  
   * 3-5 seconds \= 60% of points  
   * 5 seconds \= 30% of points

4. **Schema Markup Present:** 25% of module

   * Has schema \= full points  
   * No schema \= 0 points

**UI Label:** "Technical Trust Signals"

---

## **PHASE 3: THE LONG-TERM MOAT (15% of total score)**

### **Module 3.1: Directory Dominance (10% weight)**

**What We Check:** Presence and profile completeness on 7 directories beyond NAP check

**Scoring Logic:**

* 100 points: Claimed profiles on all 7 platforms, all complete  
* 75 points: Present on 6-7 platforms, most complete  
* 50 points: Present on 4-5 platforms  
* 25 points: Present on \<4 platforms

**Gap Message Example:** "You're completely absent from Healthgrades—losing 2,100 monthly searches from patients looking for implant specialists."

### **Module 3.2: Consistent Review System (5% weight)**

**What We Check:** Review frequency distribution (beyond velocity)  
 **Analysis:** Are reviews clustered or consistently distributed?

**Scoring Logic:**

* 100 points: Reviews show consistent monthly pattern  
* 75 points: Reviews occur regularly but with some gaps  
* 50 points: Reviews are sporadic with long gaps  
* 25 points: Reviews appear in suspicious clusters

**Gap Message:** "Google's algorithm penalizes sporadic review patterns. You need a system, not a 'campaign.'"

---

## **USER EXPERIENCE & FLOW**

### **Entry Points**

**Primary:**

* Dedicated landing page at scan.opkie.com  
* Direct link from marketing campaigns

**Secondary:**

* Embedded in $97 diagnostic kit materials  
* Follow-up from sales conversations  
* Email nurture sequences  
* LinkedIn/Facebook ads

### **Step 1: Landing Page (scan.opkie.com)**

**Headline:** "What's Blocking High-Value Patients From Finding You?"

**Subheadline:** "Find out your Digital Authority Score—and why 95% of dental practices are invisible to patients searching for implants, veneers, and Invisalign."

**Form Fields (all required):**

* Practice Name (text input)  
* Website URL (URL validation)  
* Your Email (email validation)  
* Your Phone Number (format: (XXX) XXX-XXXX)  
* Your Name (text input)

**Trust Signals Below Form:**

* "Your data is never shared. HIPAA-aware practices only."  
* "Results delivered in 2-5 minutes"  
* "Used by 200+ practices to identify $500K+ in missed revenue"

**CTA Button:** "Scan My Practice Now" (primary brand color \#20466F)

### **Step 2: Processing Screen**

**Headline:** "Analyzing Your Digital Authority..."

**Visual:** Real-time status updates (not fake progress bar)

**Status Messages (rotate every 10-15 seconds):**

* Checking Google Business Profile health...  
* Scanning 7 critical directories...  
* Analyzing website trust signals...  
* Comparing you to top-performing practices in your area...  
* Calculating your Digital Authority Score...

**Message:** "We're checking 47 data points. Results will be emailed to your address in 2-5 minutes."

**Optional:** Link to case study or TAPS framework explainer video

### **Step 3: Email Sequence**

**Email \#1: Immediate Confirmation (sent on form submit)**

From: opkie@opkie.com  
 Subject: "Analyzing your practice now..."

Body:

```
Hi [Name],

We're scanning [Practice Name]'s digital authority right now.

You'll get your results at this email in 2-5 minutes.

While you wait:
See how Dr. Martinez went from 12 new patients/month to 34 (without paid ads)
[Link to case study]

Talk soon,
Sarah & The TAPS Team

P.S. - Your results will include your exact score and a breakdown of what's 
holding you back from attracting more high-value cases.
```

**Email \#2: Results Ready (sent when scan completes)**

From: opkie@opkie.com  
 Subject: "\[Practice Name\] scored \[XX\]%—here's what that means"

Body:

```
Hi [Name],

Your practice scored [XX]% on digital authority.

Here's what that means:
- Top 5% of practices: 90%+
- Competitive practices: 75-89%
- Average practices: 60-74%
- Needs urgent attention: Below 60%

[VIEW YOUR FULL REPORT]

The biggest gap costing you high-value patients: 
[Personalized insight based on lowest-scoring module]

Want to know exactly how to fix this? Book a 15-minute TAPS Strategy Call:
[BOOK NOW]

- Sarah & The TAPS Team
```

**Email \#3: Follow-Up (24 hours later, if no call booked)**

From: opkie@opkie.com  
 Subject: "Quick question about your \[XX\]% score"

Body:

```
[Name],

I noticed you haven't booked a strategy call yet.

Most practices who score [XX]% have the same question:

"Is this fixable, or do I need to start over?"

Good news: It's fixable. And faster than you think.

The practices in your area scoring 85%+ aren't doing MORE marketing—
they're just doing the RIGHT things in the RIGHT order.

That's the TAPS system.

Want to talk through your specific gaps?
[BOOK 15-MINUTE CALL]

No pitch. Just clarity.

- Sarah
```

### **Step 4: Results Dashboard**

**Access:** Unique URL at scan.opkie.com/results/\[unique-token\]

**Results Persistence:** Indefinite (no expiration) for:

* Future reference by prospect  
* Sales team review before calls  
* Follow-up marketing campaigns

**Dashboard Structure:**

**Header Section:**

* Large visual gauge showing overall score (color-coded)  
* Practice name personalization  
* Primary CTA: "Book Your Free TAPS Strategy Call"  
* Trust signals: No long-term contracts, 2X ROI guarantee, exclusive territory

**Body Section \- TAPS Framework Breakdown:**

Each phase displays:

* Phase name and score (percentage)  
* Philosophical context (why this phase matters)  
* Module-by-module breakdown with:  
  * What we checked  
  * Your status (GREEN/YELLOW/RED indicators)  
  * Top 5% standard  
  * Your specific gap  
  * Revenue impact statement with data point

**Footer Section:**

* Reinforced primary CTA  
* Secondary CTA: "Download Your Full Report (PDF)" (V2 feature)  
* Value propositions restated  
* Calendar booking widget (Calendly or GHL)

---

## **TECHNICAL ARCHITECTURE**

### **Technology Stack**

**Frontend:**

* Framework: React or Next.js  
* Styling: Tailwind CSS (matches Opkie design system)  
* Hosting: Vercel or Netlify  
* Domain: scan.opkie.com (subdomain)

**Backend:**

* Language: Node.js with Express OR Python with Flask  
* Hosting: Railway, Render, or AWS Lambda (serverless)  
* Task Queue: Bull Queue (Redis-based) or Inngest for background processing

**Database:**

* PostgreSQL  
* Hosting: Supabase (managed Postgres \+ built-in API) OR AWS RDS  
* Stores: scan results, user data, scoring history, email delivery status

**Email Service:**

* Resend, SendGrid, or AWS SES  
* Sender address: opkie@opkie.com  
* Features needed: Templates, scheduling, delivery tracking

### **Data Sources & API Costs**

**At 500 scans per month:**

| Component | Data Source | Method | Monthly Cost |
| ----- | ----- | ----- | ----- |
| GBP Data | Google Places API | /place/details | $8-10 |
| Yelp Data | Yelp Fusion API | Business lookup | FREE (500/day limit) |
| Other Directories | Web Scraping | ScraperAPI | $25-50 |
| Website Pages | HTTP Requests | HEAD requests | Negligible |
| Site Speed | Google PageSpeed API | Performance check | FREE (25K/day limit) |
| Schema Check | HTML Parsing | Custom parser | No cost |

**Total Estimated Monthly Operational Cost:** $33-60/month (at 500 scans)  
 **At 100 scans/month (realistic MVP volume):** $10-25/month

### **API Integration Details**

**Google Places API:**

* Setup: Google Cloud Platform account, Places API enabled, billing account  
* Endpoint: GET https://maps.googleapis.com/maps/api/place/details/json  
* Parameters: place\_id, fields (rating, user\_ratings\_total, reviews, types, formatted\_phone\_number, website), key  
* Rate Limits: No hard limit, billed at $17 per 1,000 Place Details calls  
* Returns: Star rating, total reviews, 5 most recent reviews with timestamps, GBP categories, phone, website

**Review Velocity Calculation Method:**

```
Calculate based on timestamps of 5 most recent reviews
Count how many occurred within last 90 days
Score accordingly:
- 4-5 in 90 days = HIGH (100 points)
- 2-3 in 90 days = MODERATE (60 points)
- 0-1 in 90 days = LOW (30 points)
```

**Yelp Fusion API:**

* Setup: Yelp Developer account (free), create app for API key  
* Free tier: 5,000 calls/day  
* Endpoint: GET https://api.yelp.com/v3/businesses/search  
* Use: NAP consistency verification, check if practice claimed Yelp listing

**Directory Scraping (ScraperAPI):**

* Setup: ScraperAPI account ($49/month for 100K credits), API key, premium proxies  
* Targets: Bing Places, Apple Maps (requires separate $99/year Apple Developer account), Facebook, Healthgrades, Zocdoc  
* Endpoint: GET http://api.scraperapi.com/ with parameters: api\_key, url, render (for JavaScript)  
* Fallback Strategy: If scraping fails, mark as "Unable to verify", show partial results, don't block entire scan

**Google PageSpeed API:**

* Setup: No API key needed for basic usage, optional key for higher quotas (25K requests/day free)  
* Endpoint: GET https://www.googleapis.com/pagespeedonline/v5/runPagespeed  
* Parameters: url (practice website), strategy (mobile), category (performance)  
* Data Used: Performance score (0-100), Time to Interactive, First Contentful Paint, mobile-friendliness  
* Caching Strategy: Cache results for 7 days per domain to reduce API calls

### **Database Schema**

**TABLE: scans**

```
id                  UUID PRIMARY KEY
practice_name       VARCHAR(255) NOT NULL
website_url         VARCHAR(500) NOT NULL
email               VARCHAR(255) NOT NULL
phone               VARCHAR(20) NOT NULL
contact_name        VARCHAR(255) NOT NULL
created_at          TIMESTAMP DEFAULT NOW()
status              VARCHAR(50) DEFAULT 'processing'
overall_score       INTEGER
phase1_score        INTEGER
phase2_score        INTEGER
phase3_score        INTEGER
results_json        JSONB
unique_token        VARCHAR(100) UNIQUE
```

**TABLE: scan\_details**

```
id                  UUID PRIMARY KEY
scan_id             UUID REFERENCES scans(id)
module_name         VARCHAR(100)
score               INTEGER
status              VARCHAR(20)
gap_message         TEXT
data_json           JSONB
```

**TABLE: email\_log**

```
id                  UUID PRIMARY KEY
scan_id             UUID REFERENCES scans(id)
email_type          VARCHAR(50)
sent_at             TIMESTAMP
opened_at           TIMESTAMP
clicked_at          TIMESTAMP
delivery_status     VARCHAR(50)
```

### **Background Processing Architecture**

**Why Background Processing:**

* Scans take 2-5 minutes to complete (API calls, scraping)  
* User shouldn't wait on loading screen  
* Better error handling and retry logic  
* Allows email notification when complete

**Task Queue Flow:**

1. User submits form  
2. Create scan record in database (status: 'processing')  
3. Add job to queue with scan\_id  
4. Return immediately to user with processing screen  
5. Queue worker processes job:  
   * Fetch GBP data  
   * Scrape directories  
   * Crawl website  
   * Calculate scores  
   * Update database (status: 'completed')  
6. Trigger email notification

**Technology Options:**

* Bull Queue (Node.js \+ Redis): Robust, widely used  
* Inngest: Modern, built-in retries and observability  
* AWS SQS \+ Lambda: Serverless, scales automatically

**Error Handling:**

* Retry failed API calls up to 3 times  
* Partial results better than no results  
* If critical data missing (GBP not found), mark scan as 'needs\_review'  
* Send internal alert for manual follow-up

---

## **INTEGRATIONS**

### **CRM Integration (Go High Level)**

**Status:** Deferred to post-MVP  
 **Future Implementation:** Webhook or API integration

**When Ready \- Two Options:**

**Option A: Webhook (Recommended)**

* GHL provides webhook URL  
* Scanner sends POST request on:  
  * Form submission (immediate lead capture)  
  * Scan completion (with scores and gap analysis)  
* GHL automatically creates/updates contact  
* Triggers automation workflows inside GHL

**Option B: API Integration**

* Scanner uses GHL API key  
* Directly creates contacts via API  
* More control but requires more maintenance

**Data to Send:**

```
{
  "practice_name": "Main Street Dental",
  "website_url": "https://mainstreetdental.com",
  "email": "dr.smith@mainstreetdental.com",
  "phone": "(555) 123-4567",
  "contact_name": "Dr. John Smith",
  "scan_id": "abc123xyz",
  "overall_score": 68,
  "score_tier": "NEEDS_ATTENTION",
  "biggest_gap": "Core 30 Pages",
  "results_url": "https://scan.opkie.com/results/abc123xyz",
  "timestamp": "2025-11-07T14:30:00Z"
}
```

**Interim Solution:**

* Store all leads in scanner database  
* Manual CSV export capability  
* Bulk import to GHL when ready

### **Calendar Integration**

**Status:** Pending decision on platform

**Options:**

**Option A: Calendly**

* Embed Calendly widget on results page  
* Pre-fill name, email, phone from scan data  
* Simplest integration (just embed code)

**Option B: Go High Level Calendar**

* Native integration with GHL CRM  
* Automatic contact creation on booking  
* More seamless if using GHL for other functions

**Option C: Cal.com (Open Source Alternative)**

* Self-hosted or cloud  
* More customization options  
* Requires more setup

**Integration Method (all platforms similar):**

* Embed iframe or widget on results page  
* Pre-populate contact information  
* Track bookings in analytics

### **Analytics Integration (Google Analytics 4\)**

**Events to Track:**

* page\_view (landing page, processing, results)  
* form\_start (user clicks first field)  
* form\_submit (user completes form)  
* scan\_complete (processing finished)  
* results\_viewed (user opens results page)  
* cta\_click\_primary (clicks "Book Call")  
* cta\_click\_secondary (clicks "Download PDF" in V2)  
* email\_link\_click (clicks link in results email)

**Custom Dimensions:**

* Practice Name  
* Overall Score  
* Score Tier (Elite/Competitive/Needs Attention/Urgent)  
* Biggest Gap (lowest-scoring module)

**Implementation:**

* Track events using gtag or Google Tag Manager  
* Send custom parameters with each event  
* Create custom reports in GA4

---

## **BRANDING & DESIGN**

### **Brand Identity**

**Primary Brand:** Opkie  
 **Product Brand:** TAPS (Trusted Authority Profile System)

**Brand Colors:**

* Primary: \#20466F (dark blue)  
* Secondary: \#ffd147 (gold/yellow)  
* Success: \#16a34a (green for "good" indicators)  
* Warning: \#eab308 (yellow for "needs work")  
* Danger: \#dc2626 (red for "urgent issues")

**Typography:**

* Headings: Bold, authoritative sans-serif (e.g., Inter, Poppins)  
* Body: Clean, readable sans-serif (e.g., Inter, Open Sans)  
* Data/Scores: Monospace for technical feel (e.g., JetBrains Mono)

### **Tone & Voice**

**Overall Tone:** Authoritative expert (NOT friendly salesperson)

**Principles:**

* Direct and data-driven (not fluffy)  
* Confident but not arrogant  
* Educational but not condescending  
* Urgent but not alarmist  
* Professional but not corporate-sterile

**Language Patterns:**

**DO:**

* "Top 5% of practices do this differently"  
* "Here's what's holding you back"  
* "This is fixable—and faster than you think"  
* "You need a system, not a campaign"

**DON'T:**

* "You're failing\!" (too negative)  
* "We're the best\!" (unsubstantiated claim)  
* "Click here for a free consultation\!" (salesy)  
* "Just $99/month\!" (cheap positioning)

### **TAPS Branded Terminology**

**CRITICAL REQUIREMENT:** Scanner UI must use TAPS framework language throughout to create continuity with the $97 kit and services.

**UI Label Mappings:**

| Generic Term | TAPS-Branded Term | Module |
| ----- | ----- | ----- |
| GBP Categories | **Profit Zone** | 1.1 |
| GBP Services | **Product Shelf** | 1.2 |
| Review Count | **Review Boost** | 1.3 |
| Review Frequency | **Consistent Review System** | 3.2 |
| NAP Check | **NAP Consistency Check** | 1.4 |
| Website Pages | **Core 30 Authority Asset** | 2.1 |
| Technical SEO | **Technical Trust Signals** | 2.2 |
| Directory Listings | **Directory Dominance** | 3.1 |

**Overall Score Label:**

* NOT: "Marketing Health Score"  
* NOT: "SEO Score"  
* USE: **"Digital Authority Score"** OR **"TAPS Authority Score"**

**Scoring Context (Black Box Mystery):**

* "Our proprietary TAPS Authority Algorithm analyzes 47 data points..."  
* "Scoring is calibrated against the top 5% of dental practices in North America..."  
* "Your score reflects what Google's algorithm actually rewards—not vanity metrics."

---

## **LEGAL & COMPLIANCE**

### **Required Legal Pages**

**Privacy Policy:**

* Data collection disclosure (practice info, not patient data)  
* Cookie usage (Google Analytics)  
* Email communication consent  
* Data retention policy (indefinite for results, but user can request deletion)  
* Third-party data processors (Google, Yelp, ScraperAPI)  
* CCPA/GDPR compliance statements

**Terms of Service:**

* Tool accuracy disclaimer ("estimates based on public data")  
* No guarantees of specific results  
* Right to refuse service  
* Limitation of liability  
* Intellectual property (TAPS framework is proprietary)

**Cookie Consent Banner:**

* Required for GA4 tracking  
* Options: Essential cookies only vs All cookies  
* Link to Privacy Policy

### **Disclaimer Language**

**On Results Page (Footer):** "Scores are estimates based on publicly available data and may not reflect real-time changes to your online presence. This tool is for informational purposes only and does not guarantee specific marketing results. Consult with a TAPS strategist for a comprehensive analysis."

**On Landing Page (Near Form):** "Your data is never shared. HIPAA-aware practices only."

### **HIPAA Considerations**

**Assessment:** Scanner does NOT collect protected health information (PHI)

* Only collecting: practice name, website, email, phone, contact name  
* No patient data  
* No clinical information

**Positioning:**

* Use "HIPAA-aware" language (trust signal)  
* But not claiming to be "HIPAA-compliant tool" (unnecessary and misleading)

### **Accuracy & Error Handling**

**When Data Cannot Be Found:**

* **GBP not found:** "We couldn't locate your Google Business Profile. This may be because practice name doesn't match GBP listing, website URL doesn't match GBP, or practice has multiple locations."  
* **Website unreachable:** "We couldn't access your website. Please verify the URL is correct."  
* **Directory not listed:** Show as "Not listed" rather than "error"

**Disputed Scores:**

* Offer "Request Manual Review" button  
* Sales team follows up to verify and adjust if needed  
* Opportunity to have conversation about gaps

---

## **SUCCESS METRICS & ANALYTICS**

### **Primary Success Metrics**

**Lead Generation:**

* Target: 20+ qualified appointments booked per month  
* Definition of "qualified": Solo or 2-3 dentist practice, $750K-$2M revenue, interested in high-value case attraction

**Conversion Funnel Targets:**

* Landing page visits to Form starts: 40%  
* Form starts to Form completions: 85%  
* Scans completed to Email opens: 60%  
* Email opens to Results page visits: 70%  
* Results page visits to CTA clicks: 25%  
* CTA clicks to Calls booked: 60%  
* **OVERALL: Landing page visit to Call booked: 3-5%**

**Scan Quality:**

* Average score: 65-70% (validates harsh scoring)  
* Score distribution matches expected (90%+ \= \<5%, 75-89% \= 15%, 60-74% \= 40%, \<60% \= 40%)  
* \<10% of scans result in "unable to verify" for critical modules

### **Analytics Dashboard Requirements**

**Real-Time Metrics:**

* Scans in progress  
* Scans completed today  
* Calls booked today  
* Current conversion rates

**Historical Trends:**

* Daily/weekly/monthly scan volume  
* Conversion rates over time  
* Average score trends  
* Geographic distribution

**Module Performance:**

* Which modules show lowest scores most often?  
* Which gap messages correlate with highest CTA clicks?  
* Which email has highest open/click rates?

**Lead Quality Indicators:**

* Practice revenue estimates (if detectable from website/reviews)  
* Practice location (urban/suburban/rural)  
* Competitor density in area  
* Time from scan to booking

### **Optimization Opportunities**

**A/B Testing Targets:**

* Landing page headline variations  
* CTA button text ("Book Call" vs "Get Your Action Plan")  
* Email subject lines  
* Results page layout (most important module first?)

**Continuous Improvement:**

* Monitor API failure rates and add fallbacks  
* Track which directory scrapers break most often  
* Identify patterns in high-scoring vs low-scoring practices  
* Refine gap messages based on sales team feedback

---

## **LAUNCH STRATEGY**

### **Pre-Launch Checklist**

**Technical:**

* All APIs tested with 20+ real dental practices  
* Error handling tested (bad URLs, missing GBP, timeouts)  
* Email delivery tested (inbox, not spam)  
* Results dashboard responsive on mobile/tablet/desktop  
* Unique URL system working (no collisions)  
* Database backups configured  
* Monitoring/alerts set up (error rates, API failures)

**Content:**

* Landing page copy finalized and approved  
* Email templates finalized (3 emails)  
* Results page gap messages written for all modules  
* Legal pages published (Privacy, Terms)  
* Cookie consent banner implemented

**Branding:**

* Logo files integrated  
* Brand colors applied consistently  
* TAPS terminology verified throughout  
* opkie@opkie.com email sender configured

**Integrations:**

* Calendar booking system chosen and embedded  
* Google Analytics 4 tracking verified  
* CRM integration plan documented (even if deferred)

**Team Readiness:**

* Sales team trained on TAPS framework  
* Gap-specific talk tracks created  
* Lead qualification criteria established  
* Response time SLA defined (how fast to follow up?)

### **Soft Launch Plan**

**Phase 1: Internal Testing**

* Team members scan their own test practices  
* Fix any bugs or UX issues discovered  
* Verify all emails deliver correctly

**Phase 2: Warm Audience (10-20 scans)**

* Send to past prospects who didn't close  
* Send to referral partners  
* Monitor results closely  
* Gather feedback on clarity and usefulness

**Phase 3: Small Paid Campaign (50-100 scans)**

* Limited LinkedIn/Facebook ad spend  
* Single geographic market  
* Track conversion rates  
* Iterate on messaging based on data

**Phase 4: Full Launch**

* Open to all traffic sources  
* Embed on Opkie website  
* Include in sales follow-up sequences  
* Scale ad spend based on conversion economics

### **Success Criteria for Launch**

**Must Achieve in First 30 Days:**

* 100+ scans completed  
* 80%+ email capture rate  
* 10%+ scan-to-call-booked conversion  
* \<5% technical failure rate  
* Zero critical bugs

**If Not Achieved:**

* **Conversion below 10%:** Rework CTA messaging, add social proof, test different landing page headlines  
* **Technical failures above 5%:** Improve error handling, switch scraping approach, add more fallbacks  
* **Email deliverability issues:** Change ESP, improve domain authentication, adjust email content

---

## **FUTURE ENHANCEMENTS (V2 & BEYOND)**

### **Near-Term Additions (Post-MVP)**

**Full Review Scraping (Option A):**

* Replace 5-review proxy with complete review history scraping  
* More accurate velocity calculation  
* Trend analysis (reviews increasing/decreasing over time)

**PDF Report Export:**

* Branded PDF with full results  
* Downloadable from results page  
* Automatically attached to email  
* Useful for dentist to share with partners/staff

**Social Media Check:**

* Facebook page presence and activity  
* Instagram profile (if public)  
* Profile completeness scoring  
* Post frequency analysis

**Patient Sentiment Analysis:**

* NLP analysis of review text  
* Identify common themes (pain points, praise points)  
* Flag negative review patterns  
* Suggest response strategies

**Enhanced Website Analysis:**

* Keyword presence in Core 30 pages  
* Semantic analysis (does /philosophy actually describe care philosophy?)  
* Conversion element detection (CTAs, forms, phone numbers)  
* ADA compliance check

### **Medium-Term Enhancements**

**Historical Tracking:**

* Return users can see progress over time  
* "Your score improved from 68% to 81%\!"  
* Graph showing score changes  
* Track which modules improved

**Competitor Comparison:**

* "You vs. top 3 dentists in \[City\]"  
* Shows their scores vs your score  
* Identifies specific gaps where competitors outperform  
* Privacy consideration: Only show relative rankings, not names

**AI-Powered Recommendations:**

* Specific action items prioritized by impact  
* "Fix these 3 things in the next 30 days for biggest lift"  
* Estimated effort vs impact for each fix  
* DIY instructions vs "hire TAPS"

**Lead Scoring:**

* Automatic qualification based on:  
  * Practice size (detectable from team page?)  
  * Website quality (indicates budget?)  
  * Current score (sweet spot: 60-75%)  
  * Geography (exclusive territory available?)  
* Routes highest-quality leads to sales team first

### **Long-Term Vision**

**Self-Service Platform:**

* Dentist can track progress without rescan  
* Integrates with their GBP/website  
* Monthly automated reports  
* Freemium model: Basic tracking free, advanced features $99/month

**White-Label Capability:**

* Partner agencies can rebrand scanner  
* Revenue share model  
* Scales TAPS reach without direct sales effort

**Predictive Analytics:**

* "Based on current trajectory, your score will reach 85% in 4 months"  
* "Practices with your profile typically see 30% increase in high-value cases after reaching 80%"  
* Data-driven ROI predictions

**Integration Ecosystem:**

* Connect to practice management software (Dentrix, Eaglesoft)  
* Pull real production data to correlate score improvements with revenue  
* Closed-loop attribution: "Your $15K TAPS investment generated $87K in new production"

---

## **RISK ASSESSMENT & MITIGATION**

### **Technical Risks**

| Risk | Likelihood | Impact | Mitigation Strategy |
| ----- | ----- | ----- | ----- |
| Google API rate limits hit | Low | High | Implement caching, request throttling, monitor quota daily |
| Directory scraping failures | High | Medium | Use ScraperAPI with auto-retry, accept partial results, flag for manual review |
| Website timeouts | Medium | Low | 10-second timeout, show "unable to scan website" with note, score based on available data |
| Inaccurate GBP matching | Medium | High | Require website URL as verification, manual review for flagged cases, "request correction" feature |
| Email deliverability issues | Low | High | Use reputable ESP, monitor bounce rates, authenticate domain (SPF/DKIM/DMARC) |
| Database failures | Low | Critical | Automated backups every 6 hours, redundancy, monitoring alerts |

### **Business Risks**

| Risk | Likelihood | Impact | Mitigation Strategy |
| ----- | ----- | ----- | ----- |
| Low scan-to-call conversion | Medium | High | A/B test CTAs, strengthen FUD in copy, add social proof, improve results page design |
| Dentists dispute scores | Medium | Medium | Clear disclaimers, "request review" feature, use as conversation starter not final judgment |
| Competitors copy tool | High | Low | Speed to market critical, TAPS branding is differentiator, continuous improvement |
| Spam/fake submissions | Medium | Low | Honeypot field, reCAPTCHA, email verification required |
| Sales team unprepared for leads | Low | High | Train on TAPS framework, provide gap-specific talk tracks, role-play common objections |
| Dentists already working with agency | Medium | Medium | Position as "second opinion," focus on "asset vs rental" message, highlight exclusive territory |

### **Market Risks**

| Risk | Likelihood | Impact | Mitigation Strategy |
| ----- | ----- | ----- | ----- |
| Market saturation (too many audit tools) | High | Medium | Differentiate through TAPS integration, focus on quality over quantity, niche down to dental-only |
| Google algorithm changes | Medium | Medium | Monitor SEO news, update scoring logic quarterly, don't over-index on one factor |
| Dentists become skeptical of "free audits" | Low | Medium | Emphasize educational value, no high-pressure sales, genuine insights not just FUD |
| Economic downturn reduces marketing budgets | Medium | High | Double down on ROI guarantee messaging, focus on high-value case attraction |

---

## **APPENDIX**

### **TAPS Framework Quick Reference**

**Phase 1: The Foundational Sprint**

* Profit Zone (GBP Categories)  
* Product Shelf (GBP Services)  
* Review Boost & Velocity  
* NAP Consistency

**Phase 2: The Asset Engine**

* Core 30 Authority Asset  
* Technical Trust Signals

**Phase 3: The Long-Term Moat**

* Directory Dominance  
* Consistent Review System

**Full TAPS Service Value:** $48,500-$74,500 (market replacement cost)  
 **TAPS Investment:** $15K upfront or $6K × 3 months  
 **ROI Guarantee:** 2X return ($30K production) in 90 days

### **Key Resources**

**API Documentation:**

* Google Places API: https://developers.google.com/maps/documentation/places/web-service/details  
* Yelp Fusion API: https://docs.developer.yelp.com/docs/fusion-intro  
* ScraperAPI: https://www.scraperapi.com/documentation/

**Contact:**

* Project Owner: Sarah Lunt (Opkie)  
* Email: opkie@opkie.com

### **Pending Decisions**

1. Calendar integration platform (Calendly vs GHL vs other)  
2. Logo files and additional brand assets  
3. 10-20 dental practice names for testing  
4. Sales team lead routing process  
5. Definition of "qualified lead" for handoff  
6. When to implement GHL webhook integration

---

## **DOCUMENT CONTROL**

**Version History:**

* v1.0 (Current): Initial comprehensive PRD \- All MVP features defined, technical architecture specified, integration points documented, launch checklist created

**Change Management:**

* Any changes to core scoring algorithm require approval  
* UI/copy changes can be iterated based on data  
* New features follow standard prioritization process

**Review Cycle:**

* Review quarterly for accuracy  
* Update based on market changes, competitor moves  
* Incorporate learnings from launched scanner

**Distribution:**

* Internal team (Opkie)  
* Development team  
* Sales/marketing stakeholders

---

**END OF PRODUCT REQUIREMENTS DOCUMENT**

This PRD is comprehensive and production-ready. Development can begin immediately with the technical specifications provided. All strategic decisions are documented and justified. Success criteria are measurable and trackable.

---

