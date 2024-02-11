# Overview

All changes should be made in the countries/countries.json document unless you know what you are doing. Currently (02/11/2024) there are three countries that have their fields complete:
* Georgia
* Greece
* Croatia


## Completing the country database

Remember: things will work even if we have null or 0 values (see note below) but they should be filled in as much as possible. I am following the following type of formatting for the values:
* Anything that is unknown AND should be an integer is left as 0
* Anything that is unknown AND should be a string (a sentence or a word) should be null
* ANything that is unknown AND should be a boolean value (true/false) should be null **Do not use yes/no/none. Use true/false instead**

Here is an example of what one should look like with some additonal information added in as comments // (even though it's not valid json)

'''json
{
  "country_name": "Atlantis",
  "visa_name": "Digital nomad visa",
  "official_link": "www.atlantis.com/visa",
  "type": "Anchor",
  "validity_months": 12,
  "renewability": false,
  "renewability_details": "yes, up to 99 years",
  "application_fee_single_usd": 500,
  "application_fee_couples_usd": 800,
  "application_fee_family_usd": 0, // left at 0 since they do not have a family application.
  "income_requirement_usd_monthly": 0, // either there is no requirement or it is unknown.
  "application_timeline_days": 10,
  "local_tax_on_foreign_income": false, // or null if we don't know. This seems like a pretty important one though
  "tax_residency_trigger_days": 183,
  "tax_residency_trigger_details": null, // nothing special about their tax residency trigger. 
  "special_tax_regime": false,
  "special_tax_regime_details": null, // special tax regine is false so there must not be any details.
  "leads_to_permanent_residence": false,
  "permenant_residency_details": "", // again, permanent residence is false so there can't be any details.
  "dependent_application": false,
  "application_in_country": "Online with consulate visit",
  "cost_of_living_single_usd": 0, // we don't have any information on it so just leaving it as zero since it should be an integer.
  "index_score": 0, // again, unknown so leaving it as a zero
  "days_of_sun": 5, // under the ocean after all
  "lifestyle_keywords": ['mythology', 'fishing'],
  "image": "../images/atlantis.jpeg",
  "Tagline": null,
  "action_comment": null,
  // below this is basically all of the information that will be populating the page the user sees. The stuff above is mostly for the search and matching functionality. This is fine for now though since we can get a working prototype up with just the 3 countries. 
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
'''

