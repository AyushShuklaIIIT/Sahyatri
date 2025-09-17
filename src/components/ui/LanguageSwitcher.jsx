import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
  ];

  return (
    <div className='p-4 bg-gray-50 rounded-2xl shadow-lg'>
      <p className='text-sm font-medium text-gray-700 mb-3 flex items-center'>
        <Globe className="w-4 h-4 mr-2" />
        {t('select_language')}
      </p>
      <div className='flex flex-wrap gap-2'>
        {languages.map((lang) => (
          <button 
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              i18n.language === lang.code 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
// ```

// Now, you can import and use `<LanguageSwitcher />` in any component where you want the buttons to appear, like `RoleSelectionScreen` or a settings page in the dashboards.

// ### Part 2: Translating Dynamic Content (e.g., Places)

// This is the most important part. You should **not** hardcode translations for every possible tourist spot in your frontend's `.json` files. This data must come from your backend and be stored in a multilingual format in your MongoDB database.

// #### The Strategy: Store Translations in the Database

// Your backend will be responsible for providing the name of a place in all supported languages. The frontend's only job is to ask for the data and display the name in the currently selected language.

// **Step 1: Modify Your MongoDB Schema**
// In your backend project, update your schema for places (or any dynamic content) to support multiple languages. For example, if you had a `places` collection, the model would look like this:

// ```javascript
// // Example: src/models/Place.js in your backend
// const placeSchema = new mongoose.Schema({
//   // ... other fields like location, description, etc.
//   name: {
//     en: { type: String, required: true },
//     hi: { type: String, required: true }
//   },
//   description: {
//     en: { type: String },
//     hi: { type: String }
//   }
// });
// ```

// An example document in your MongoDB `places` collection would look like this:
// ```json
// {
//   "_id": "some_object_id",
//   "name": {
//     "en": "Bara Imambara",
//     "hi": "बड़ा इमामबाड़ा"
//   },
//   "description": {
//     "en": "An imambara complex in Lucknow, India.",
//     "hi": "भारत के लखनऊ में एक इमामबाड़ा परिसर।"
//   }
// }
