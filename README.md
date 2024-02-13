# Overview

Nomad Tax Pro is a website targeted at Digital Nomads looking to benefit from USA tax benefits that are offered to Digital Nomads while minimizing tax obligation in foregin countries. Mainly, this is the FEIE benefit/ foregin presence test. There are plenty of articles online that summarize this if you'd like to spend the time (~10 minute read) but here is a quick summary:

To qualify for the Foreign Earned Income Exclusion (FEIE) under the U.S. tax law, a U.S. citizen or resident alien must pass either the Physical Presence Test or the Bona Fide Residence Test. Nomad Tax Pro focuses on the Physical Presence Test for now. These tests are designed to demonstrate that you have a tax home in a foreign country and meet specific time requirements outside the United States. Here’s an overview of the Physcial Presence Test:

Physical Presence Test: to meet the Physical Presence Test, you must be physically present in a foreign country or countries for at least 330 full days during any period of 12 consecutive months. The 330 qualifying days do not have to be consecutive. This test is purely mathematical and is based on the actual number of days you spend in a foreign country, regardless of your intent or purpose for being there.


**Addional Key Points for Physical Presence Test:**

* A "full day" means a 24-hour period starting at midnight.
* Travel days, where you are traveling to or from the United States, do not count towards the 330 days unless you are in foreign airspace or waters for the entire day.
* You can choose any 12-month period to meet the 330 full days requirement, and it does not need to align with the tax year.


**US Citizen may be required to pay taxes in foregin countries where they have earned income. Nomad Tax Pro offers a database and tracker so that nomads can easily see which countries they may have tax obligation in and, ultimately, plan their travels and activities so that they can avoind these taxes entirely or limit them as much as possible.** 


## Page 1: Landing page

This is not designed in figma as of now.

Functionality: sign up for new users and login for existing users. Describes value of the subscription based service and benefits of successfully navigating FEIE residency requirements. Incudes call to action (sign up) and examples of FEIE qualifying itineraries.

## Page 2: Signup Page

This is also not designed in figma as of now. 

Functionality: Allow users to signup and accept payment. This should be easily integrated or already integrated with a third party provider. Ideally, I can just add an applicaiton key or something to make the connection. 

## Page 3: Country Database. 

This is the default page for first time users/ post signup. 

Design: Grid layout of countries with basic visa information on country components.

Functionality:
- Search for countries based on key attributes. These are the 'country_name',  'anchor' (true/false), local_tax_on_foreign_income (true/false), cost of living (range) attributes in the objects
- Countries can be favorited by a user and updated in the user database.
- User can remove favorited countries in left side bar component

## Page 4: Country Page. 

This one is laid out in figma and basically just shows the user the description of the country and potential tax benefits. 

Functionality:
* 'Add stay' button that allows the user to add this country to the stays database/ Physical Presence Test Tracker UI. 

**In the countries/countries.json file, three countries have their fields complete that will populate this page.** You will need to use one of these to complete the design of this page. Countries that don't have the 'Tagline' attribute should be ignored and not show up here. 
* Georgia
* Greece
* Croatia

## Page 5: Physical Presence Test Tracker

This is the post login default page for users with 1+ logins

The backbone of this is a 'stays' database with a model that allows for at least the country_name, stay identifier (a user could stay in one country multiple times in 330 days so an arbitrary identifier is necessary), start date and end date. 

### Functionality: 
- Easily see favorited countries in the left side bar. These potential stays can be dragged and dropped into the itenirary (center component) and have their dates updated. If not, dragged and dropped, an 'add stay' popup that allows the user to input start date and end date. Resuse component from 'Add Stay' button on Country Page, if possible. 
- User can scroll up or down on the page to see more future or past stays.
- User stays are collabsable in the center component. 
- User stays in the center component are editable (start and end date)
- key_considerations are shown which will give the user the abilty to understand potential tax implications at a glance for each stay. 
- clicking on country name will route the user to the country page to see additional info regarding taxation, lifestyle and benfits. 

### Tracker component

This is the right sidebar in the Physical Presence Test Tracker page. It it comprised of 3 smaller components. 

1. Pie Chart: This component shows a pie chart of total days that a user has been outside of the US in the designated area. This has a start date that is autogenerated for today when the uses adds their first stay. The start date can also be reset by the user or modified by the user. A user may want to move their start date forward or back since the physical presence test can be any 330 consecutive days. This component shows the sum of past stays in a bold color slice & planned stays in a lighter color slice within the total of 330 days. 
2. Calendar: Collabsable component. This highlights the current day and allows the user to skip to the selected date. 
3. Stays short list: list of stays but with no key considerations. Just dates and country name. 


### Page 6: User admin page. 

Not currently in Figma page but super basic is fine for now. 

Functionality:
- Manage account billing. 
- Request support
- What else am I not considering??