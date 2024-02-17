const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const financialBenefitsSchema = new Schema({
  benefit: String,
  description: String
});

const taxRatesSchema = new Schema({
  Standard_rate_range_min: Number,
  Standard_rate_range_max: Number,
  Standard_rate_percentage: Number
});

const reducedRateSchema = new Schema({
  Reduced_rate_range_min: Number,
  Reduced_rate_range_max: Number,
  Reduced_rate_percentage: Number
});

const lifestylePointsSchema = new Schema({
  point: String,
  description: String
});

const additionalBenefitsSchema = new Schema({
  benefit: String,
  description: String
});

const countrySchema = new Schema({
  country_name: String,
  display: Boolean,
  visa_name: String,
  official_link: String,
  type: String,
  validity_months: Number,
  renewability: Boolean,
  renewability_details: String,
  application_fee_single_usd: Number,
  application_fee_couples_usd: Number,
  application_fee_family_usd: Number,
  income_requirement_usd_monthly: Number,
  application_timeline_days: Number,
  local_tax_on_foreign_income: Boolean,
  tax_residency_trigger: Number,
  tax_residency_trigger_details: String,
  special_tax_regime: Boolean,
  special_tax_regime_details: String,
  leads_to_permanent_residence: Boolean,
  permenant_residency_details: String,
  dependent_application: Boolean,
  application_in_country: String,
  cost_of_living_single: Number,
  index_score: Number,
  days_of_sun: Number,
  lifestyle_keywords: [String],
  description: String,
  image: String,
  Tagline: String,
  action_comment: String,
  finanical_benefits_tagline: String,
  financial_benefits: [financialBenefitsSchema],
  key_consideration: String,
  Currency_symbol: String,
  Tax_rates: [taxRatesSchema],
  reduction_rate: Number,
  Reduced_rate: [reducedRateSchema],
  lifestyle_points: [lifestylePointsSchema],
  Additional_benefits: [additionalBenefitsSchema],
  Conclusion: String
}, { collection: 'countries' });

// module.exports = mongoose.model('Countries', );

const Countries = mongoose.model('Countries', countrySchema);
module.exports = Countries;
