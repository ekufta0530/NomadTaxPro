# Completing the Country Database

All changes should be made in the [countries/countries.json](https://github.com/ekufta0530/NomadTaxPro/blob/main/countries/countries.json) document unless you know what you are doing. Currently (as of 02/11/2024) there are three countries that have their fields complete:
* Georgia
* Greece
* Croatia

Following the formatting below, fill in the countries as much as possinle. I am thinking that the best way to do this for you is just in the github.com webpage. There are some other options as well if you find this to be a hassle.

## What is json?

Quick primer on this. It is basicically just fields and values. The field is the first part and the value is the thing trailing the :

Here is an example of 2 objects that descibes us. "name" is the field. The value is "eric". 

```json
{
"name": "eric",
"age_years" : 33,
"income_usd_monthly" : 3000,
"married" : false,
"cool" : null
},
{
"name": "Matt",
"age_years" : 35,
"income_usd_monthly" : 3000,
"married" : false,
"cool" : true
}

```
We don't use any counters or symbols like 33 years or $3000 per month. That is just 33 since years is implied by the "age_years" value and same for income using usd & monthly in the value name. 

Also, notice I use false for the "married" field instead of yes/no. **Do not use yes/no/none. Use true/false instead**

As for "cool" value, I marked it as null to demonstate a point I will reinforce later in this doc. In this example, let's say it is not known or we don't have enough information. I am just going to leave it as null. The effect of this is that when you're searching in an imaginary database for "cool" people, I won't show up but I also won't show up if you search for not cool people. **Do not use unspecified/unknown/not enough info. Use null instead**

# Formatting

### Unknown values
Remember: things will work even if we have null or 0 values (see note below) but they should be filled in as much as possible. I am implementing the following type of formatting for the unknown values:
* Anything that is unknown AND should be an integer is left as 0
* Anything that is unknown AND should be a string (a sentence or a word) should be null
* Anything that is unknown AND should be a boolean value (true/false) should be null 

### Use case for null or 0 when something is known

**important** In this example (just showing the relevant fields and eliminating all the junk above and below), special tax regime is false so there must not be any details therefore it is marked as null.
```json 
{ 
  "special_tax_regime": false,
  "special_tax_regime_details": null, 
}
```

In this example, there is no family application so the value is left as 0 since it should be an integer.
```json
{
 "application_fee_single_usd": 500,
  "application_fee_couples_usd": 800,
  "application_fee_family_usd": 0,
}
```

### Example

Here is an example of what one should look like with some additonal information added in as comments (everything after the //)

```json
{
  "country_name": "Atlantis", // wrapped in quotes since it is a string. 
  "visa_name": "Digital Nomad Visa",
  "official_link": "www.atlantis.com/visa/nomad",
  "type": "Anchor",
  "validity_months": 12,
  "renewability": true,
  "renewability_details": "up to 99 years", // on the website this will end up reading like "Yes! Up to 99 years."
  "application_fee_single_usd": 500,
  "application_fee_couples_usd": 800,
  "application_fee_family_usd": 0, // left at 0 since they do not have a family application and it is an integer.
  "income_requirement_usd_monthly": 0, // either there is no requirement or it is unknown.
  "application_timeline_days": 10,
  "local_tax_on_foreign_income": false, // or null if we don't know. This seems like a pretty important one though
  "tax_residency_trigger_days": 183, // if something has no tax residency trigger then let me know and we can handle that case specially. 
  "tax_residency_trigger_details": null, // nothing special about their tax residency trigger. marked as null since it should be a string. 
  "special_tax_regime": false,
  "special_tax_regime_details": null, // special tax regine is false so there must not be any details.
  "leads_to_permanent_residence": false,
  "permenant_residency_details": null, // again, permanent residence is false so there can't be any details.
  "dependent_application": false,
  "application_in_country": "Online with consulate visit",
  "cost_of_living_single_usd": 0, // we don't have any information on it so just leaving it as zero since it should be an integer.
  "index_score": 0, // again, unknown so leaving it as a zero
  "days_of_sun": 5, // under the ocean after all
  "lifestyle_keywords": "['mythology', 'fishing']",
  "image": "../images/atlantis.jpeg", // this is just formatted as a string but don't worry about this one, Matt.
  
  // below this is the main body of the information that will be populating the page the user sees though we may use a little from above. The stuff above is mostly for the search and matching functionality. The emptiness is fine for now though since we can get a working prototype up with just the 3 countries which have all of this populated. In fact, all of the coutries in the coutnries.json file have this and most of these fields are empty.

  "Tagline": null,
  "action_comment": null,
  "country_description": null,
  "finanical_benefits_tagline": null,
  "financial_benefits": [
    {
      "benefit": null,
      "description": null
    }
  ],
  "key_consideration": null,
  "Currency_symbol": null,
  "Tax_rates": [
    {
      "Standard_rate_range_min": 0,
      "Standard_rate_range_max": 0,
      "Standard_rate_percentage": 0
    }
  ],
  "reduction_rate": 0,
  "Reduced_rate": [
    {
      "Reduced_rate_range_min": 0,
      "Reduced_rate_range_max": 0,
      "Reduced_rate_percentage": 0
    }
  ],
  "lifestyle_points": [
    {
      "point": null,
      "description": null
    }
  ],
  "Additional_benefits": [
    {
      "benefit": null,
      "description": null
    }
  ],
  "Conclusion": null
}
```

