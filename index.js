const Alexa = require("ask-sdk");
const https = require("https");



const invocationName = "cat safety guide";

const prompt = {

plants: [
'African violet',
'bamboo',
'blue echeveria',
'burro or lambs tail',
'hens and chickens',
'jasmine',
'marigold',
'petunia',
'ponytail palm',
'rose',
'orchid',
'wild hyacinth'],

plantsDesc: [
'African violets appear on many lists of "safe" plants for pets, so if Missy\'s mid-morning snack consisted of your favorite violet she should have no ill effects.',
'Some cats enjoy chewing bamboo on the leafs in between meals. If they overdo it, it can cause them to become nauseous and vomit, but no worries, this is one plant that is not toxic to cats, even if overeaten.',
'Echeveria are safe around pets and humans, although it\'s not advisable to eat them.',
'burro is safe for cats',
'Sempervivum Hens and Chicks are safe to grow, and they aren\'t poisonous if ingested.',
'True Jasminium is not toxic to cats, dogs or horses. But there are other plants that are called "jasmine" besides true jasmine.',
'if your cat eats marigold leaves or stems, she will suffer mild mouth irritation, possible drooling, tummy pain and diarrhea',
'petunias are not toxic to dogs, cats or other animals, but too much can cause digestive problem',
'The ponytail palm is actually not a palm but is instead a succulent. so it is safe',
'Roses are not toxic to cats, but they do have thorns. If your cat plays in a rosebush or tries to eat its leaves and stems, he could get an upset stomach and scratch up his skin and face.',
'While orchids are not considered toxic to dogs and cats, there always is a chance that an orchid hybrid carries that one odd gene that creates a harmful compound in leaves or flowers that could cause sickness in a pet',
'Non-Toxic to Dogs, Non-Toxic to Cats, Non-Toxic to Horses'],

foodlist: 
['banana',
'apple',
'grape',
'strawberry',
'orange',
'watermelon',
'lemon',
'blueberries',
'peach',
'cantaloupe',
'avocado',
'pineapple',
'cherries',
'pears',
'limes',
'raspberries',
'blackberries',
'plum',
'nectarine',
'grapefruit',
'potatoes',
'tomato',
'onion',
'carrot',
'lettuce',
'broccoli',
'salad',
'bell peppers',
'celery',
'cucumbers',
'corn',
'garlic',
'mushroom',
'sweet potatoes',
'spinach',
'cabbage',
'green beans',
'cauliflower',
'green onions',
'asparagus',
'salmon',
'tuna',
'catfish',
'markerel',
'flounder',
'herring',
'sardines',
'pollock',
'trout',
'haddock',
'Turkey',
'Chicken',
'liver',
'Duck',
'Lamb',
'Ham',
'goat',
'beef',
'beef tongue',
'fat'],

foodlistDesc:
[
"If you have a cat that likes bananas, a small bite now and then likely wouldn\'t hurt them. But, keep in mind that this is a completely inappropriate food for a cat. Your cat would be much better off if you fed a healthy, meat-based snack.” ... So when it comes to cats and bananas, make your kitty\'s home abanana-free zone.",
"Apple Seeds Are Not Safe for Cats. As already said above, cats can eat a few apple pieces without experiencing any ill effects. However, you cannot give your cat apple seeds. Apple seeds contain cyanide, which is a poisonous not only to cats, but other animals and humans as well.",
"Grapes and Raisins. Cats are not likely to eat these, and there are no reports of cats becoming ill from these foods. However, dogs can suffer acute kidney failure from eating grapes or raisins, so it is best to not to risk your cat\'s health and not let him eat these foods.",
"Strawberries are non-toxic to cats. Although cats can eat them, they offer very little nutritional benefits to them. Strawberries have anti-oxidant qualities that a cat might benefit from.",
"cats cannot eat oranges or other citrus fruits. The essential oils and psoralens in oranges are toxic to cats. If your catwould consume some orange, then she would most likely get a bad diarrhea and/or start to vomit. Eating oranges can also cause depression and photosensitivity in cats.",
"Watermelon is very safe for cats toeat. Even, watermelon provides a health benefit to our felinefriend supplying them water content. Melon like cantaloupe, honeydew, and watermelon fruits are safe to eat.",
"No, cats cannot eat lemons too! The problem withlemons for cats is that lemons contain the same toxic essential oils and psoralens. Additionally, lemons are even more acidic than oranges, so they are even more likely to upset your cat\'s stomach. ",
"They\'re not just a superfood for humans, their benefits apply to your dog or cat too. As with any people-food though, moderation is key when feeding your pet blueberries. Blueberries are low in fat and calories, but high in fiber, making them a great natural treat for the health conscious dog or cat.",
"Peaches are not themselves poisonous to cats, although they can potentially cause diarrhea or loose stools. Much more dangerous, however, are the peachpits which contain a chemical compound called cyanide.",
" While cantaloupe is just fine as a treat, don\'t let either animal eatso much of it that it takes the space of foods with more species-specific nutrition, or that it contributes to excess weight.",
"Avocado contains a toxin called persin, but despite the rumors, avocado is not poisonous to dogs, nor likely tocats. Only certain species are poisoned by persin. While dogs and cats don\'t seem to be affected by persin, avocado poisoning can be deadly to birds and large animals ",
" Neither the leaves nor the fruit of the pineapple are toxic or poisonous to cats. There is a difference between foodstuffs that cats can eatand those that they should eat. ",
"even though Cherries do have a lot of antioxidants, Cats remain obligate carnivores and thus they have difficulties digesting fruits such as cherries and this can result in indigestion shown through vomiting or diarrhea. Keep these as a treat and in small portions for the wellbeing of your furry friend.",
"The fleshy part of pears are safe for cats to eat in small quantities. ... Pears aren\'t the only fruit whose seeds contain cyanogenic glycoside. The same holds true for apples, as well as peach, apricot, nectarine and plum pits.",
"According to the ASPCA, lemons and limes are toxic to both dogs andcats. These fruits contain a substance called psoralens, which when combined with the acidity in lemons and limes, can make ingestion dangerous.",
"Even though cats are carnivores and their bodies have been designed for processing meat, they\'ve been known to enjoy the occasional berry, like strawberries orraspberries. And lucky for you (and your cat) a raspberryeaten now and then is safe for cats, as long as it\'s in controlled amounts.",
"According to the ASPCA, fresh fruits and vegetables in moderation generally are fine for cats. While blackberries made the list of fruits potentially deadly to animals, they are not toxic when ingested, but only dangerous if lodged in an animal\'s nasal passages.",
"Plum poisoning occurs after your cat consumes any part of the plum fruit or plant. ... Plums are always toxic to cats, but they are especially dangerous as they wilt. This is because they have higher concentrations of the toxin during wilting.",
"Stone fruits like apricots, plums, peaches, cherries, and nectarines can be a nice treat for your pet, but make sure they don\'t swallow the pits. ... Although it\'s unlikely, the swallowing the pits also carries the risk of cyanide poisoning.",
"Grapefruit is a common human household food item that is toxic to your cat. Most cats have a natural adversity to citrus fruits and do not readily consume them, but it is possible for your cat to accidentally ingest grapefruit or be exposed to grapefruit oil ",
"Some cat foods even contain potato ingredients. ...Cats can eat potatoes, and they may find them tasty. A treat or two of sweet potatoes or fried chips won\'t harm your feline pal if it\'s a one-time thing, but it canbe fatal in the long run. Cooked, baked, and boiledpotatoes are safe for cats, but not on a daily basis.",
"It should be noted, though, that ripe tomato is used in said cat foods. ... Most experts agree that cats cansafely eat the ripe fruit of the plant. Don\'t worry though, as cats are unlikely to nibble on raw tomatoes because the texture and taste of green tomatoes aren\'t pleasing for most of our feline friends.",
"Onions contain an ingredient called thiosulphate which is toxic to cats and dogs. The ingestion of onions causes a condition called hemolytic anemia, which is characterized by damage to the red blood cells. Onion toxicity can cause the red blood cells circulating through your pet\'s body to burst.",
"When it comes to carrots, you don\'t have to worry about your cats eating them, as they are not toxic or dangerous to cats. However, most people recommend only feeding cats cooked carrots, since the raw formcan be very crunchy, making it difficult for cats to chew and digest the fibrous vegetable",
"Can Cats Eat Salad Cress. Lettuce and dark leafy vegetables are good and healthy for your cats. If yourcat loves lettuce and some greens, then they could be a great source of water and nutrients. In my experience, some cats might like to eat these greens and some might not care.",
"The good news is that broccoli is one of several vegetables and fruits that are OK for cats to eat. Furnami probably would have been better off without the seasoning, but otherwise, it was OK. Other veggies you can try are carrots and green beans.",
"Lettuce is not toxic to cats, so you can feed somelettuce to your cat, but only a small amount of lettuceis safe. ... However, if eaten in large quantities, the dietary fiber can have a laxative effect, especially forcats who don\'t normally eat a lot of greens.",
"The drawback: cats often struggle to digest plant foods, so felines who consume too much bell peppermay struggle with upset stomach, vomiting, or diarrhea. If your cat becomes ill after eating bell peppers, reduce their portion size or opt for a more easily digestible vegetable",
"Celery is quite safe for cats, but it is recommendable that cats eat this vegetable occasionally. Celery is safe for your cat if she eats it in small amounts. Manycats show a big interest in eating celery leaves. They react at celery leaves the same as at catnip.",
"In short, yes, cats can eat cucumber. There\'s nothing wrong with giving your cat a few slices of cucumber to eat. In fact, cats too could enjoy the nutrients cucumberhas to offer.",
"Many cats like corn, and polenta, a coarsely ground cornmeal, has a good texture for them. ... Cats tend to like smaller grains like millet and couscous. Just make sure any grains you give are cooked so your kitty candigest them fully.",
"Onions and Garlic. All members of the onion familycan cause problems if eaten in sufficient quantity. A little bit of onion or garlic in some sauce is not likely to cause any problems. However, eating a clove ofgarlic or a green onion may cause digestive upset.",
"Your cat will probably suffer no ill effects if she nibbles some store-bought mushrooms. However, some wildmushrooms are toxic to cats. Learn the symptoms ofmushroom poisoning so you can act quickly if yourfeline accidentally ingests the wrong type of fungus.",
"A small bit of a dehydrated sweet potato slice may appeal to your kittens and cats as an unusual or occasional treat, but only in the limited quantities that they can handle. The same goes for a touch of cooked, boiled, or baked sweet potato, free of additives, spices, or toppings.",
"In small amounts, cats too need to eat greens. Isspinach, though, a healthy green for cats? Unfortunately, the answer is no. The problem withspinach for cats is that spinach contains low amounts of calcium oxalate, which can cause crystal formations in a cat\'s urinary tract.",
"Raw cabbage does contain an anion known as thiocyanate, which can impair thyroid function, but it is highly unlikely that cats would ever deign to eatenough raw cabbage to do them any harm. The worst you can expect from a cat eating cabbage is an increase in gas. ... Carrots are perfectly acceptable forcats to eat.",
"All varieties of green beans can be a good treat for felines, from fresh to frozen or canned. If you\'re opting for canned green beans, make sure they\'re either low in sodium or totally free of it. Canned foods often contain a lot of salt.",
"A small amount of cauliflower(preferably steamed and cut into small pieces) is safe for a cat to eat as a treat. ... Also too much cauliflower in a cat\'s diet can result in stomach irritation and a very odoriferous litter box.",
"a green onionmay cause digestive upset. Eating some type of onionon a regular basis could cause anemia. Baby food made from meat is often seasoned with onion orgarlic, so read the labels carefully if you feed these to your cat.",
"It\'s entirely appropriate to wonder whether artichokes and asparagus, vegetables rich in fiber, vitamins, and minerals, are safe to offer our cats. ... It is neither toxic nor dangerous for our cats to consume in very small portions, but neither is it truly beneficial to them.Cats are obligate carnivores.",
"Salmon Is Okay for Cats as a Treat. While salmonshould not be the basis of your cat\'s diet, it is still okay as a treat. Salmon still does contain a lot valuable nutrients for cats. ... The only problem with feedingsalmon to your cat as a treat is that cats can become addicted to salmon and refuse to eat other food.",
"Cats can be addicted to tuna, whether it\'s packed forcats or for humans. Some tuna now and then probably won\'t hurt. But a steady diet of tuna prepared for humans can lead to malnutrition because it won\'t have all the nutrients a cat needs. And, too much tuna can cause mercury poisoning.",
"catfish in  Raw  contain an enzyme that breaks down Vitamin B1 (thiamine). Signs of thiamine deficiency include anorexia, loss of coordination, vestibular disorders, aggression, and seizures",
"Mackerel is Acceptable but Raw fish can contain parasites that can make your kitty sick or have other ill effects on her health. And Not as the Entire Diet",
"Fish should form only a fraction of your cat’s diet. Fish bones must be removed. Fish should be cooked and avoid anything in oil",
"Fish should form only a fraction of your cat’s diet. Fish bones must be removed. Fish should be cooked and avoid anything in oil",
"Fish should form only a fraction of your cat’s diet. Fish bones must be removed. Fish should be cooked and avoid anything in oil",
"Fish should form only a fraction of your cat’s diet. Fish bones must be removed. Fish should be cooked and avoid anything in oil",
" Atlantic salmon, trout, cod, flounder, which are common fish that might be fed to cats or dogs, does not contain thiaminase.",
"Fish should form only a fraction of your cat’s diet. Fish bones must be removed. Fish should be cooked and avoid anything in oil",
"Cats are meat eaters, plain and simple. They have to have protein from meat for a strong heart, good vision, and a healthy reproductive system. Cooked beef, chicken, turkey, and small amounts of lean deli meats are a great way to give them that. Raw or spoiled meat could make your cat sick.",
"Cats are meat eaters, plain and simple. They have to have protein from meat for a strong heart, good vision, and a healthy reproductive system. Cooked beef, chicken, turkey, and small amounts of lean deli meats are a great way to give them that. Raw or spoiled meat could make your cat sick.",
"Small amounts of liver are OK, but eating too muchliver can cause vitamin A toxicity. This is a serious condition that can affect your cat\'s bones. Symptoms include deformed bones, bone growths on the elbows and spine, and osteoporosis. Vitamin A toxicity canalso cause death.",
"Chicken, Turkey and Duck. ... Chicken and turkey breast are classified as lean meat, which is the best calorie source for cats.Duck meat is also safe but is higher in fat, so it should be fed more sparingly. Always make sure that poultry is cooked to 165 degrees Fahrenheit to kill pathogens.",
"Lamb and veal are both safe for cats to eat, although they are pricier than most other options. Lamb is often fatty, so should only be fed in small quantities or should be trimmed of excess fat before feeding to your cat. Lamb and veal should be cooked to an internal temperature of 145 F.",
"The sodium levels in ham pose little threat to healthycats. But make sure to check with your vet if your cathas health issues. Cats and ham go together as long as you give your cat ham that has been cooked as a treat. Your furry little friend will appreciate it if you believe in feeding cats ham as a snack",
"Cats are meat eaters, plain and simple. They have to have protein from meat for a strong heart, good vision, and a healthy reproductive system. Cooked beef, chicken, turkey, and small amounts of lean deli meats are a great way to give them that. Raw or spoiled meat could make your cat sick.",
"Cats are meat eaters, plain and simple. They have to have protein from meat for a strong heart, good vision, and a healthy reproductive system. Cooked beef, chicken, turkey, and small amounts of lean deli meats are a great way to give them that. Raw or spoiled meat could make your cat sick.",
"Cats are meat eaters, plain and simple. They have to have protein from meat for a strong heart, good vision, and a healthy reproductive system. Cooked beef, chicken, turkey, and small amounts of lean deli meats are a great way to give them that. Raw or spoiled meat could make your cat sick.",
"Cats will gladly eat all the fat trimmings you want to give them, but it’s best not to feed them to your furry friend. Eating fat trimmings can raise the level of lipids in the blood and lead to pancreatitis, a painful and potentially fatal"
  
]


}



// Session Attributes 
//   Alexa will track attributes for you, by default only during the lifespan of your session.
//   The history[] array will track previous request(s), used for contextual Help/Yes/No handling.
//   Set up DynamoDB persistence to have the skill save and reload these attributes between skill sessions.

function getMemoryAttributes() {   const memoryAttributes = {
       "history":[],


       "launchCount":0,
       "lastUseTimestamp":0,

       "lastSpeechOutput":{},
       // "nextIntent":[]

       // "favoriteColor":"",
       // "name":"",
       // "namePronounce":"",
       // "email":"",
       // "mobileNumber":"",
       // "city":"",
       // "state":"",
       // "postcode":"",
       // "birthday":"",
       // "bookmark":0,
       // "wishlist":[],
   };
   return memoryAttributes;
};

const maxHistorySize = 20; // remember only latest 20 intents 


// 1. Intent Handlers =============================================
const FALLBACK_MESSAGE = "I'm sorry I dont understand, Say help to learn more"
const FALLBACK_REPROMPT = 'What can I help you with?';
const AMAZON_FallbackIntent_Handler =  {
  
    // 2018-May-01: AMAZON.FallackIntent is only currently available in en-US locale.

  //              This handler will not be triggered except in that locale, so it can be

  //              safely deployed for any locale.

  canHandle(handlerInput) {

    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest'

      && request.intent.name === 'AMAZON.FallbackIntent';

  },

  handle(handlerInput) {

    return handlerInput.responseBuilder

      .speak(FALLBACK_MESSAGE)

      .reprompt(FALLBACK_REPROMPT)

      .getResponse();

  },

};
/*
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.FallbackIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let previousSpeech = getPreviousSpeechOutput(sessionAttributes);

        return responseBuilder
            .speak('Sorry I didnt catch what you said, ' + stripSpeak(previousSpeech.outputSpeech))
            .reprompt(stripSpeak(previousSpeech.reprompt))
            .getResponse();
    },
};
*/

const AMAZON_CancelIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.CancelIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();


        let say = 'Okay, talk to you later! ';

        return responseBuilder
            .speak(say)
            .withShouldEndSession(true)
            .getResponse();
    },
};

const AMAZON_HelpIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let history = sessionAttributes['history'];
        let intents = getCustomIntents();
        let sampleIntent = randomElement(intents);
        
        let intents2 = getCustomIntents();
        let sampleIntent2 = randomElement(intents);
        
        let q1 = getSampleUtterance(sampleIntent);
        let q2 = getSampleUtterance(sampleIntent2)
        
        while (q1 == q2 ){
            let q2 = getSampleUtterance(sampleIntent2)
        }
        
        let say = ''; 

        let previousIntent = getPreviousIntent(sessionAttributes);
        if (previousIntent && !handlerInput.requestEnvelope.session.new) {
        //     say += 'Your last intent was ' + previousIntent + '. ';
         }
        // say +=  'I understand  ' + intents.length + ' intents, '

        say += ' Here something you can ask me, ' + q1 + "<break time='200ms'/>" +  ', or '  + "<break time='200ms'/>"  +  q2 ;

        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const AMAZON_StopIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.StopIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();


        let say = 'Okay, talk to you later! ';

        return responseBuilder
            .speak(say)
            .withShouldEndSession(true)
            .getResponse();
    },
};

const DietIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'DietIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        // delegate to Alexa to collect all the required slots 
        const currentIntent = request.intent; 
        if (request.dialogState && request.dialogState !== 'COMPLETED') { 
            return handlerInput.responseBuilder
                .addDelegateDirective(currentIntent)
                .getResponse();

        } 
        let say = ""// 'Hello from DietIntent. ';

        let slotStatus = '';
        let resolvedSlot;

        let slotValues = getSlotValues(request.intent.slots); 
        // getSlotValues returns .heardAs, .resolved, and .isValidated for each slot, according to request slot status codes ER_SUCCESS_MATCH, ER_SUCCESS_NO_MATCH, or traditional simple request slot without resolutions

        // console.log('***** slotValues: ' +  JSON.stringify(slotValues, null, 2));
        //   SLOT: food 
        if (slotValues.food.heardAs && slotValues.food.heardAs !== '') {
            //slotStatus += ' slot food was heard as ' + slotValues.food.heardAs + '. ';
            
        

            
            
        } else {
            slotStatus += 'slot food is empty. ';
        }
        if (slotValues.food.ERstatus === 'ER_SUCCESS_MATCH') {
            //slotStatus += 'a valid ';
                slotStatus +=  prompt.foodlistDesc[prompt.foodlist.indexOf(slotValues.food.heardAs)];            
                
            if(slotValues.food.resolved !== slotValues.food.heardAs) {
                //slotStatus += 'synonym for ' + slotValues.food.resolved + '. '; 
                } else {
               // slotStatus += 'match. '
            } // else {
                //
        }
        if (slotValues.food.ERstatus === 'ER_SUCCESS_NO_MATCH') {
            //slotStatus += 'which did not match any slot value. ';
           slotStatus += "I don't know how to response to that. Say help to learn more"

            console.log('***** consider adding "' + slotValues.food.heardAs + '" to the custom slot type used by slot food! '); 
        }

        if( (slotValues.food.ERstatus === 'ER_SUCCESS_NO_MATCH') ||  (!slotValues.food.heardAs) ) {
           // slotStatus += 'A few valid values are, ' + sayArray(getExampleSlotValues('DietIntent','food'), 'or');
        }

        say += slotStatus;


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .withStandardCard('Cat Diet:', slotStatus)
            .getResponse();
    },
};

const PlantIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'PlantIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        // delegate to Alexa to collect all the required slots 
        const currentIntent = request.intent; 
        if (request.dialogState && request.dialogState !== 'COMPLETED') { 
            return handlerInput.responseBuilder
                .addDelegateDirective(currentIntent)
                .getResponse();

        } 
        let say = ""; //'Let me look at my plant library.';

        let slotStatus = '';
        let resolvedSlot;

        let slotValues = getSlotValues(request.intent.slots); 
        // getSlotValues returns .heardAs, .resolved, and .isValidated for each slot, according to request slot status codes ER_SUCCESS_MATCH, ER_SUCCESS_NO_MATCH, or traditional simple request slot without resolutions

        // console.log('***** slotValues: ' +  JSON.stringify(slotValues, null, 2));
        //   SLOT: plant 
        if (slotValues.plant.heardAs && slotValues.plant.heardAs !== '') {
           // slotStatus += ' slot plant was heard as ' + slotValues.plant.heardAs + '. ';
            

                
          
        } else {
            slotStatus += 'slot plant is empty. ';
        }
        if (slotValues.plant.ERstatus === 'ER_SUCCESS_MATCH') {
              slotStatus +=  prompt.plantsDesc[prompt.plants.indexOf(slotValues.plant.heardAs)];    
            //slotStatus += 'a valid ';
            if(slotValues.plant.resolved !== slotValues.plant.heardAs) {
                slotStatus += 'synonym for ' + slotValues.plant.resolved + '. '; 
                } else {
              //  slotStatus += 'match. '
            } // else {
             
                //
        }
        if (slotValues.plant.ERstatus === 'ER_SUCCESS_NO_MATCH') {
            //slotStatus += 'which did not match any slot value. ';
             slotStatus += "I don't know how to response to that. Say help to learn more"
            console.log('***** consider adding "' + slotValues.plant.heardAs + '" to the custom slot type used by slot plant! '); 
        }

        if( (slotValues.plant.ERstatus === 'ER_SUCCESS_NO_MATCH') ||  (!slotValues.plant.heardAs) ) {
          
           slotStatus += 'A few valid values are, ' + sayArray(getExampleSlotValues('PlantIntent','plant'), 'or');
        }

        say += slotStatus;


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const environmentIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'environmentIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = 'Cats are extremely independent creatures, \
                  so they\'re pretty capable of taking care of themselves. \
                  However, even stubborn cats feel the harsh effects of winter or summer.\
                  anything below 32 degrees or abobe 100 degree is dangerous for cat';

        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const playwithcatIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'playwithcatIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let play1 = "Different cats will prefer different types of games, but don’t play rough and tumble games or tease your cat by moving your fingers or feet under duvets and rugs. Both are great games but can encourage your cat to grab and bite you.";
        
        let play2 = "Cats like movement so the toy must be one that can move in rapid and unpredictable ways, \
                    just like a mouse or bird. Toys that reflect light or appear to change in some way are particularly attractive. \
                    Cats also like toys with different textures that are around the size of their natural prey. Many cats love squeaky toys but some cats are startled by them so introduce them carefully."
        
        let play3 = "Pet cats don’t have to hunt for their food but you can add some excitement and activity into feeding time by using a food ball. This is a ball just bigger than a tennis ball, in which you can put dried cat food. As the cat pushes and bats the ball with its paws the pieces of food fall out. A piece of tuna or cat treats in a scrunched up piece of paper can also provide fun for your cat."
                    
        let say = randomElement([play1, play2, play3])       


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const HoldingCat_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'HoldingCat' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();


        let hold1 = "Although some cats do not like being held because of their personalities. \
        most can be trained to accept it if they know they will receive a reward <break time='500ms'/> \
        To hold cat, first know if the cat wants to be pickup. If they seem angry dont try to hold them. \
        and make sure to hold and lean your cat against your chest";
        

        let hold2 = "To hold cat <break time='500ms'/> \
                     Place one hand under the cat's body, behind its front legs, <break time='500ms'/> \
                    if you are sure that the cat is accepting of being picked up. \
                    Place the other hand under the cat\'s hindquarters. <break time='200ms'/> then \
                    Gently lift the cat. and Hold the cat against your chest.<break time='600ms'/> Good Luck";
                    
                    
        let say = randomElement([hold1, hold2])        


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};


const cattips_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'cattips' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

       
        let tip = [];
        let tipstr = ""

        tipstr = "Your pet should have her own clean, dry place in your home to sleep and rest. Line your cat's bed with a soft, warm blanket or towel. Be sure to wash the bedding often. Please keep your cat indoors. Outdoor cats do not live as long as indoor cats. ";
        tip.push(tipstr);
        
        tipstr = "Outdoor cats are at risk of trauma from cars, or from fights with other cats, raccoons and free-roaming dogs. Coyotes are known to eat cats. Outdoor cats are more likely to become infested with fleas or ticks, as well as contract infectious diseases.";
        tip.push(tipstr);
        
        tipstr = "If allowed outdoors, your cat must wear a safety collar and an ID tag. A safety collar with an elastic panel will allow your cat to break loose if the collar gets caught on something.";
        tip.push(tipstr);
        
        tipstr = "All indoor cats need a litter box, which should be placed in a quiet, accessible location. In a multi-level home, one box per floor is recommended. Avoid moving the box unless absolutely necessary, but if you must do so, move the box just a few inches per day.";
        tip.push(tipstr);
        
        tipstr = "Keep in mind that cats won't use a messy, smelly litter box, so scoop solid wastes out of the box at least once a day. Dump everything, wash with a mild detergent and refill at least once a week; you can do this less frequently if using clumping litter. ";
        tip.push(tipstr);
        
        tipstr = "Cats need to scratch! When a cat scratches, the old outer nail sheath is pulled off and the sharp, smooth claws underneath are exposed. Cutting your cat’s nails every two to three weeks will keep them relatively blunt and less likely to harm the arms of both humans and furniture.";
        tip.push(tipstr);
        
        tipstr = "Your cat should see the veterinarian at least once a year for an examination and annual shots, and immediately if she is sick or injured.";
        tip.push(tipstr);
        
        tipstr = "Never give your cat medication that has not been prescribed by a veterinarian. If you suspect that your animal has ingested a poisonous substance, call your veterinarian ";
        tip.push(tipstr);
        
        tipstr = "Cats are indeed independent by nature, but they're not quite able to take care of themselves. Before you adopt, make sure that your lifestyle can make room for a feline. How busy you are and the amount of time you spend at home will dictate the kind of cat you should get";
        tip.push(tipstr);
        
        tipstr = "If you do suffer from severe allergic reactions, consider testing yourself for feline allergies before bringing a cat home. Then again, some people with allergies might adapt to their own pet, but still be allergic to other cats. A safe bet is to choose a cat with low allergens. ";
        tip.push(tipstr);
        
        tipstr = "Cats love to play. Toy mice, string, feathers, and even empty boxes make for great amusement. Playthings needn't be expensive, just make sure there's enough to keep your cat happy, active, and mentally occupied.";
        tip.push(tipstr);
        
        tipstr = "Catnip, and those little freeze-dried cat treats are excellent tools for cat bribery and training.";
        tip.push(tipstr);

            
        let say = randomElement(tip)  ;


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .withStandardCard('Cat Tips:', say)
            .getResponse();
    },
};



const LaunchRequest_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;


        let say = randomElement(['Hello ','Hi! ', 'Hi again '])  + "<break time='200ms'/>" + '\
        and Welcome to ' + invocationName + ".<break time='200ms'/>" + " \
        You can ask me about cat's diet, like... " + "<break time='200ms'/>" + "Can cat eats apple?" + "<break time='200ms'/>" + " or " +  "<break time='200ms'/>"+ "tell me cat tips." +  "<break time='200ms'/>"+ " or " +  "<break time='200ms'/>"+ " say help for more options.";
        
        let skillTitle = capitalize(invocationName);


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .withStandardCard('Welcome!', 
              'Hello!\nWelcome to ' + skillTitle,
               welcomeCardImg.smallImageUrl, welcomeCardImg.largeImageUrl)
            .getResponse();
    },
};

const SessionEndedHandler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
        return handlerInput.responseBuilder.getResponse();
    }
};

const ErrorHandler =  {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const request = handlerInput.requestEnvelope.request;

        console.log(`Error handled: ${error.message}`);
        // console.log(`Original Request was: ${JSON.stringify(request, null, 2)}`);

        return handlerInput.responseBuilder
            .speak(`Sorry, your skill got this error.  ${error.message} `)
            .reprompt(`Sorry, your skill got this error.  ${error.message} `)
            .getResponse();
    }
};


// 2. Constants ===========================================================================

    // Here you can define static data, to be used elsewhere in your code.  For example: 
    //    const myString = "Hello World";
    //    const myArray  = [ "orange", "grape", "strawberry" ];
    //    const myObject = { "city": "Boston",  "state":"Massachusetts" };

const APP_ID = undefined;  // TODO replace with your Skill ID (OPTIONAL).

// 3.  Helper Functions ===================================================================

function capitalize(myString) {

     return myString.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }) ;
}

 
function randomElement(myArray) { 
    return(myArray[Math.floor(Math.random() * myArray.length)]); 
} 
 
function stripSpeak(str) { 
    return(str.replace('<speak>', '').replace('</speak>', '')); 
} 
 
 
 
 
function getSlotValues(filledSlots) { 
    const slotValues = {}; 
 
    Object.keys(filledSlots).forEach((item) => { 
        const name  = filledSlots[item].name; 
 
        if (filledSlots[item] && 
            filledSlots[item].resolutions && 
            filledSlots[item].resolutions.resolutionsPerAuthority[0] && 
            filledSlots[item].resolutions.resolutionsPerAuthority[0].status && 
            filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) { 
            switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) { 
                case 'ER_SUCCESS_MATCH': 
                    slotValues[name] = { 
                        heardAs: filledSlots[item].value, 
                        resolved: filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name, 
                        ERstatus: 'ER_SUCCESS_MATCH' 
                    }; 
                    break; 
                case 'ER_SUCCESS_NO_MATCH': 
                    slotValues[name] = { 
                        heardAs: filledSlots[item].value, 
                        resolved: '', 
                        ERstatus: 'ER_SUCCESS_NO_MATCH' 
                    }; 
                    break; 
                default: 
                    break; 
            } 
        } else { 
            slotValues[name] = { 
                heardAs: filledSlots[item].value || '', // may be null 
                resolved: '', 
                ERstatus: '' 
            }; 
        } 
    }, this); 
 
    return slotValues; 
} 
 
function getExampleSlotValues(intentName, slotName) { 
 
    let examples = []; 
    let slotType = ''; 
    let slotValuesFull = []; 
 
    let intents = model.interactionModel.languageModel.intents; 
    for (let i = 0; i < intents.length; i++) { 
        if (intents[i].name == intentName) { 
            let slots = intents[i].slots; 
            for (let j = 0; j < slots.length; j++) { 
                if (slots[j].name === slotName) { 
                    slotType = slots[j].type; 
 
                } 
            } 
        } 
 
    } 
    let types = model.interactionModel.languageModel.types; 
    for (let i = 0; i < types.length; i++) { 
        if (types[i].name === slotType) { 
            slotValuesFull = types[i].values; 
        } 
    } 
 
    slotValuesFull = shuffleArray(slotValuesFull); 
 
    examples.push(slotValuesFull[0].name.value); 
    examples.push(slotValuesFull[1].name.value); 
    if (slotValuesFull.length > 2) { 
        examples.push(slotValuesFull[2].name.value); 
    } 
 
 
    return examples; 
} 
 
function sayArray(myData, penultimateWord = 'and') { 
    let result = ''; 
 
    myData.forEach(function(element, index, arr) { 
 
        if (index === 0) { 
            result = element; 
        } else if (index === myData.length - 1) { 
            result += ` ${penultimateWord} ${element}`; 
        } else { 
            result += `, ${element}`; 
        } 
    }); 
    return result; 
} 
function supportsDisplay(handlerInput) // returns true if the skill is running on a device with a display (Echo Show, Echo Spot, etc.) 
{                                      //  Enable your skill for display as shown here: https://alexa.design/enabledisplay 
    const hasDisplay = 
        handlerInput.requestEnvelope.context && 
        handlerInput.requestEnvelope.context.System && 
        handlerInput.requestEnvelope.context.System.device && 
        handlerInput.requestEnvelope.context.System.device.supportedInterfaces && 
        handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display; 
 
    return hasDisplay; 
} 
 
 
const welcomeCardImg = { 
    smallImageUrl: "https://github.com/thamarnan/cat-safety-guide/blob/master/images/cat2.jpg?raw=true", 
    largeImageUrl: "https://github.com/thamarnan/cat-safety-guide/blob/master/images/cat2.jpg?raw=true" 
 
    //largeImageUrl: "https://s3.amazonaws.com/skill-images-789/cards/card_plane1200_800.png" 
 
 
}; 
 
const DisplayImg1 = { 
    title: 'Jet Plane', 
    url: 'https://s3.amazonaws.com/skill-images-789/display/plane340_340.png' 
}; 
const DisplayImg2 = { 
    title: 'Starry Sky', 
    url: 'https://s3.amazonaws.com/skill-images-789/display/background1024_600.png' 
 
}; 
 
function getCustomIntents() { 
    const modelIntents = model.interactionModel.languageModel.intents; 
 
    let customIntents = []; 
 
 
    for (let i = 0; i < modelIntents.length; i++) { 
 
        if(modelIntents[i].name.substring(0,7) != "AMAZON." && modelIntents[i].name !== "LaunchRequest" ) { 
            customIntents.push(modelIntents[i]); 
        } 
    } 
    return customIntents; 
} 
 
function getSampleUtterance(intent) { 
    
    let randomstr = randomElement(intent.samples);
    
    if (randomstr.includes("{food}"))
    {
        randomstr = randomstr.replace("{food}",randomElement(prompt.foodlist))
    }
    if (randomstr.includes("{plant}"))
    {
        randomstr = randomstr.replace("{plant}",randomElement(prompt.plants))
    }
    
    
    return  randomstr
 
} 
 
function getPreviousIntent(attrs) { 
 
    if (attrs.history && attrs.history.length > 1) { 
        return attrs.history[attrs.history.length - 2].IntentRequest; 
 
    } else { 
        return false; 
    } 
 
} 
 
function getPreviousSpeechOutput(attrs) { 
 
    if (attrs.lastSpeechOutput && attrs.history.length > 1) { 
        return attrs.lastSpeechOutput; 
 
    } else { 
        return false; 
    } 
 
} 
 
function timeDelta(t1, t2) { 
 
    const dt1 = new Date(t1); 
    const dt2 = new Date(t2); 
    const timeSpanMS = dt2.getTime() - dt1.getTime(); 
    const span = { 
        "timeSpanMIN": Math.floor(timeSpanMS / (1000 * 60 )), 
        "timeSpanHR": Math.floor(timeSpanMS / (1000 * 60 * 60)), 
        "timeSpanDAY": Math.floor(timeSpanMS / (1000 * 60 * 60 * 24)), 
        "timeSpanDesc" : "" 
    }; 
 
 
    if (span.timeSpanHR < 2) { 
        span.timeSpanDesc = span.timeSpanMIN + " minutes"; 
    } else if (span.timeSpanDAY < 2) { 
        span.timeSpanDesc = span.timeSpanHR + " hours"; 
    } else { 
        span.timeSpanDesc = span.timeSpanDAY + " days"; 
    } 
 
 
    return span; 
 
} 
 
 
const InitMemoryAttributesInterceptor = { 
    process(handlerInput) { 
        let sessionAttributes = {}; 
        if(handlerInput.requestEnvelope.session['new']) { 
 
            sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
 
            let memoryAttributes = getMemoryAttributes(); 
 
            if(Object.keys(sessionAttributes).length === 0) { 
 
                Object.keys(memoryAttributes).forEach(function(key) {  // initialize all attributes from global list 
 
                    sessionAttributes[key] = memoryAttributes[key]; 
 
                }); 
 
            } 
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes); 
 
 
        } 
    } 
}; 
 
const RequestHistoryInterceptor = { 
    process(handlerInput) { 
 
        const thisRequest = handlerInput.requestEnvelope.request; 
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
 
        let history = sessionAttributes['history'] || []; 
 
        let IntentRequest = {}; 
        if (thisRequest.type === 'IntentRequest' ) { 
 
            let slots = []; 
 
            IntentRequest = { 
                'IntentRequest' : thisRequest.intent.name 
            }; 
 
            if (thisRequest.intent.slots) { 
 
                for (let slot in thisRequest.intent.slots) { 
                    let slotObj = {}; 
                    slotObj[slot] = thisRequest.intent.slots[slot].value; 
                    slots.push(slotObj); 
                } 
 
                IntentRequest = { 
                    'IntentRequest' : thisRequest.intent.name, 
                    'slots' : slots 
                }; 
 
            } 
 
        } else { 
            IntentRequest = {'IntentRequest' : thisRequest.type}; 
        } 
        if(history.length > maxHistorySize - 1) { 
            history.shift(); 
        } 
        history.push(IntentRequest); 
 
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes); 
 
    } 
 
}; 
 
 
 
 
const RequestPersistenceInterceptor = { 
    process(handlerInput) { 
 
        if(handlerInput.requestEnvelope.session['new']) { 
 
            return new Promise((resolve, reject) => { 
 
                handlerInput.attributesManager.getPersistentAttributes() 
 
                    .then((sessionAttributes) => { 
                        sessionAttributes = sessionAttributes || {}; 
 
 
                        sessionAttributes['launchCount'] += 1; 
 
                        handlerInput.attributesManager.setSessionAttributes(sessionAttributes); 
 
                        handlerInput.attributesManager.savePersistentAttributes() 
                            .then(() => { 
                                resolve(); 
                            }) 
                            .catch((err) => { 
                                reject(err); 
                            }); 
                    }); 
 
            }); 
 
        } // end session['new'] 
    } 
}; 
 
 
const ResponseRecordSpeechOutputInterceptor = { 
    process(handlerInput, responseOutput) { 
 
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
        let lastSpeechOutput = { 
            "outputSpeech":responseOutput.outputSpeech.ssml, 
            "reprompt":responseOutput.reprompt.outputSpeech.ssml 
        }; 
 
        sessionAttributes['lastSpeechOutput'] = lastSpeechOutput; 
 
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes); 
 
    } 
}; 
 
const ResponsePersistenceInterceptor = { 
    process(handlerInput, responseOutput) { 
 
        const ses = (typeof responseOutput.shouldEndSession == "undefined" ? true : responseOutput.shouldEndSession); 
 
        if(ses || handlerInput.requestEnvelope.request.type == 'SessionEndedRequest') { // skill was stopped or timed out 
 
            let sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
 
            sessionAttributes['lastUseTimestamp'] = new Date(handlerInput.requestEnvelope.request.timestamp).getTime(); 
 
            handlerInput.attributesManager.setPersistentAttributes(sessionAttributes); 
 
            return new Promise((resolve, reject) => { 
                handlerInput.attributesManager.savePersistentAttributes() 
                    .then(() => { 
                        resolve(); 
                    }) 
                    .catch((err) => { 
                        reject(err); 
                    }); 
 
            }); 
 
        } 
 
    } 
}; 
 
 
function shuffleArray(array) {  // Fisher Yates shuffle! 
 
    let currentIndex = array.length, temporaryValue, randomIndex; 
 
    while (0 !== currentIndex) { 
 
        randomIndex = Math.floor(Math.random() * currentIndex); 
        currentIndex -= 1; 
 
        temporaryValue = array[currentIndex]; 
        array[currentIndex] = array[randomIndex]; 
        array[randomIndex] = temporaryValue; 
    } 
 
    return array; 
} 
// 4. Exports handler function and setup ===================================================
const skillBuilder = Alexa.SkillBuilders.standard();
exports.handler = skillBuilder
    .addRequestHandlers(
        AMAZON_FallbackIntent_Handler, 
        AMAZON_CancelIntent_Handler, 
        AMAZON_HelpIntent_Handler, 
        AMAZON_StopIntent_Handler, 
        DietIntent_Handler, 
        PlantIntent_Handler, 
        environmentIntent_Handler, 
        playwithcatIntent_Handler, 
        HoldingCat_Handler,
        cattips_Handler,  
        LaunchRequest_Handler, 
        SessionEndedHandler
    )
    .addErrorHandlers(ErrorHandler)
    .addRequestInterceptors(InitMemoryAttributesInterceptor)
    .addRequestInterceptors(RequestHistoryInterceptor)

   // .addResponseInterceptors(ResponseRecordSpeechOutputInterceptor)

 // .addRequestInterceptors(RequestPersistenceInterceptor)
 // .addResponseInterceptors(ResponsePersistenceInterceptor)

 // .withTableName("askMemorySkillTable")
 // .withAutoCreateTable(true)

    .lambda();


// End of Skill code -------------------------------------------------------------
// Static Language Model for reference


const model = {
  "interactionModel": {
    "languageModel": {
      "invocationName": "cat safety guide",
      "intents": [
        {
          "name": "AMAZON.FallbackIntent",
          "samples": []
        },
        {
          "name": "AMAZON.CancelIntent",
          "samples": []
        },
        {
          "name": "AMAZON.HelpIntent",
          "samples": [
            "tell me more"
          ]
        },
        {
          "name": "AMAZON.StopIntent",
          "samples": []
        },
        {
          "name": "DietIntent",
          "slots": [
            {
              "name": "food",
              "type": "food",
              "samples": [
                "i want to know about {food}",
                "i want to know more about {food}",
                "Is it ok for cat to eat {food}",
                "Is safe for cat to eat {food}",
                "what happened if cat ate {food}",
                "what if cat eats {food}",
                "what if cat ate {food}",
                "the {food}",
                "tell me about {food}",
                "my cat ate {food}",
                "is {food} good for cat",
                "can cat eats {food}",
                "can cat eat {food}",
                "cat ate {food}"
              ]
            }
          ],
          "samples": [
            "I want to know about {food}",
            "Is it ok for cat to eat {food}",
            "Can cat eats {food}",
            "tell me about {food}"
          ]
        },
        {
          "name": "PlantIntent",
          "slots": [
            {
              "name": "plant",
              "type": "plants",
              "samples": [
                "can cat go near {plant}",
                "Is {plant} plant toxic",
                "Is {plant} toxic to cat",
                "If {plant} toxic to cat"
              ]
            }
          ],
          "samples": [
            "is {plant} toxic to cat",
            "Is {plant} safe for cat"
          ]
        },
        {
          "name": "environmentIntent",
          "slots": [],
          "samples": [
            "is it too cold for cat",
            "is it too hot for cat",
            "what is ideal temperature for cat",
            "what temperature can cat go outside",
            "tell me safe temperature for cat",
            "what is the safe temperature for cat",
            "is it too hot",
            "is it too cold"
          ]
        },
        {
          "name": "playwithcatIntent",
          "slots": [],
          "samples": [
            "How to safely play with cat",
            "How to play with cat",
            "Learn how to play with cat"
          ]
        },
        {
          "name": "HoldingCat",
          "slots": [],
          "samples": [
            "How to hug a cat",
            "Do cats like to be held",
            "How do I hold cat",
            "how to hold cat",
            "How to handle cat"
          ]
        },
        {
          "name": "LaunchRequest",
          "slots": [],
          "samples": []
        },
        {
          "name": "cattips",
          "slots": [],
          "samples": [
            "show me some tips",
            "what are some interesting fact about cat",
            "tell me cat facts",
            "show me cat facts",
            "what are some tips",
            "tell me cat tips"
          ]
        }
      ],
      "types": [
        {
          "name": "food",
          "values": [
            {
              "name": {
                "value": "banana"
              }
            },
            {
              "name": {
                "value": "apple"
              }
            },
            {
              "name": {
                "value": "grape"
              }
            },
            {
              "name": {
                "value": "strawberry"
              }
            },
            {
              "name": {
                "value": "orange"
              }
            },
            {
              "name": {
                "value": "watermelon"
              }
            },
            {
              "name": {
                "value": "lemon"
              }
            },
            {
              "name": {
                "value": "blueberries"
              }
            },
            {
              "name": {
                "value": "peach"
              }
            },
            {
              "name": {
                "value": "cantaloupe"
              }
            },
            {
              "name": {
                "value": "avocado"
              }
            },
            {
              "name": {
                "value": "pineapple"
              }
            },
            {
              "name": {
                "value": "cherries"
              }
            },
            {
              "name": {
                "value": "pears"
              }
            },
            {
              "name": {
                "value": "limes"
              }
            },
            {
              "name": {
                "value": "raspberries"
              }
            },
            {
              "name": {
                "value": "blackberries"
              }
            },
            {
              "name": {
                "value": "plum"
              }
            },
            {
              "name": {
                "value": "nectarine"
              }
            },
            {
              "name": {
                "value": "grapefruit"
              }
            },
            {
              "name": {
                "value": "potatoes"
              }
            },
            {
              "name": {
                "value": "tomato"
              }
            },
            {
              "name": {
                "value": "onion"
              }
            },
            {
              "name": {
                "value": "carrot"
              }
            },
            {
              "name": {
                "value": "lettuce"
              }
            },
            {
              "name": {
                "value": "broccoli"
              }
            },
            {
              "name": {
                "value": "salad"
              }
            },
            {
              "name": {
                "value": "bell peppers"
              }
            },
            {
              "name": {
                "value": "celery"
              }
            },
            {
              "name": {
                "value": "cucumbers"
              }
            },
            {
              "name": {
                "value": "corn"
              }
            },
            {
              "name": {
                "value": "garlic"
              }
            },
            {
              "name": {
                "value": "mushroom"
              }
            },
            {
              "name": {
                "value": "sweet potatoes"
              }
            },
            {
              "name": {
                "value": "spinach"
              }
            },
            {
              "name": {
                "value": "cabbage"
              }
            },
            {
              "name": {
                "value": "green beans"
              }
            },
            {
              "name": {
                "value": "cauliflower"
              }
            },
            {
              "name": {
                "value": "green onions"
              }
            },
            {
              "name": {
                "value": "asparagus"
              }
            },
            {
              "name": {
                "value": "salmon"
              }
            },
            {
              "name": {
                "value": "tuna"
              }
            },
            {
              "name": {
                "value": "catfish"
              }
            },
            {
              "name": {
                "value": "markerel"
              }
            },
            {
              "name": {
                "value": "flounder"
              }
            },
            {
              "name": {
                "value": "herring"
              }
            },
            {
              "name": {
                "value": "sardines"
              }
            },
            {
              "name": {
                "value": "pollock"
              }
            },
            {
              "name": {
                "value": "trout"
              }
            },
            {
              "name": {
                "value": "haddock"
              }
            },
            {
              "name": {
                "value": "Turkey"
              }
            },
            {
              "name": {
                "value": "Chicken"
              }
            },
            {
              "name": {
                "value": "liver"
              }
            },
            {
              "name": {
                "value": "Duck"
              }
            },
            {
              "name": {
                "value": "Lamb"
              }
            },
            {
              "name": {
                "value": "Ham"
              }
            },
            {
              "name": {
                "value": "goat"
              }
            },
            {
              "name": {
                "value": "beef"
              }
            },
            {
              "name": {
                "value": "beef tongue"
              }
            },
            {
              "name": {
                "value": "fat"
              }
            }
          ]
        },
        {
          "name": "plants",
          "values": [
            {
              "name": {
                "value": "ivy"
              }
            },
            {
              "name": {
                "value": "Marijuana"
              }
            },
            {
              "name": {
                "value": "rhododendrons"
              }
            },
            {
              "name": {
                "value": "Sago palm"
              }
            },
            {
              "name": {
                "value": "Tulips"
              }
            },
            {
              "name": {
                "value": "Daffodils"
              }
            },
            {
              "name": {
                "value": "Autumn"
              }
            },
            {
              "name": {
                "value": "Dracaena"
              }
            },
            {
              "name": {
                "value": "agaves"
              }
            },
            {
              "name": {
                "value": "Lilies"
              }
            },
            {
              "name": {
                "value": "African violet"
              }
            },
            {
              "name": {
                "value": "bamboo"
              }
            },
            {
              "name": {
                "value": "blue echeveria"
              }
            },
            {
              "name": {
                "value": "burro or lamb’s tail"
              }
            },
            {
              "name": {
                "value": "hens and chickens (evergreen succulents)"
              }
            },
            {
              "name": {
                "value": "jasmine"
              }
            },
            {
              "name": {
                "value": "marigold"
              }
            },
            {
              "name": {
                "value": "petunia"
              }
            },
            {
              "name": {
                "value": "ponytail palm"
              }
            },
            {
              "name": {
                "value": "rose"
              }
            },
            {
              "name": {
                "value": "orchid"
              }
            },
            {
              "name": {
                "value": "wild hyacinth"
              }
            }
          ]
        }
      ]
    },
    "dialog": {
      "intents": [
        {
          "name": "DietIntent",
          "confirmationRequired": false,
          "prompts": {},
          "slots": [
            {
              "name": "food",
              "type": "food",
              "confirmationRequired": false,
              "elicitationRequired": true,
              "prompts": {
                "elicitation": "Elicit.Slot.1049677617233.477953773297"
              }
            }
          ]
        },
        {
          "name": "PlantIntent",
          "confirmationRequired": false,
          "prompts": {},
          "slots": [
            {
              "name": "plant",
              "type": "plants",
              "confirmationRequired": false,
              "elicitationRequired": true,
              "prompts": {
                "elicitation": "Elicit.Slot.1232955343295.356733853054"
              }
            }
          ]
        }
      ]
    },
    "prompts": [
      {
        "id": "Elicit.Slot.1049677617233.477953773297",
        "variations": [
          {
            "type": "PlainText",
            "value": "I can tell you about different kind of food for your cat like, vegetable, fruit, or any kind of meat and fish. Tell me what you're intrested in."
          }
        ]
      },
      {
        "id": "Elicit.Slot.1232955343295.356733853054",
        "variations": [
          {
            "type": "PlainText",
            "value": "I can tell you about what kind of plants that safe around your cat.. including rose, aloe vera, or orchid. Tell me what you're look for."
          }
        ]
      }
    ]
  }
};
