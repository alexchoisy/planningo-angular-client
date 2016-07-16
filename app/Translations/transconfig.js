/**
 * Created by alexandre on 14/07/16.
 */

var translations = {
    fr: {},
    en: {}
};

$.extend(translations.fr, m_FR);
$.extend(translations.en, m_EN);

MyApp.config(['$translateProvider', function ($translateProvider) {
    // add translation table
    $translateProvider
        .translations('en', translations.en)
        .translations('fr', translations.fr)
        .preferredLanguage('fr');
}]);