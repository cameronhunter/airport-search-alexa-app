import { Skill, Launch, Intent } from 'alexa-annotations';
import Response, { say } from 'alexa-response';
import search from './search';
import Airport from './airport';

export class App {

  @Launch
  launch() {
    return Response.build({
      ask: 'Welcome to "Airport Search". Which city would you like to search for?',
      reprompt: 'Which city would you like to search for?'
    });
  }

  @Intent('App_US_CITY', 'App_EUROPE_CITY', 'App_GB_CITY', 'App_DE_CITY', 'App_COUNTRY', 'App_AT_CITY', 'Search')
  search({ us_city, europe_city, gb_city, de_city, country, at_city, query: querySlot }) {
    const query = (us_city || europe_city || gb_city || de_city || country || at_city || querySlot);
    return search(query).then((results) => {
      const count = results.length;
      switch(count) {
        case 0: {
          return Response.build({
            ask: `I couldn't find any airports for ${query}. Would you like to search for another?`,
            reprompt: 'Which city would you like to search for?'
          });
        }
        case 1: {
          const { name, country_name, code } = results[0];
          return Response.build({
            ask: (
              <speak>
                <Airport {...results[0]} />
                <break time='1s' />
                <s>Would you like to search for another?</s>
              </speak>
            ),
            reprompt: 'Would you like to search for another?',
            card: {
              title: `Airport search for ${query}`,
              content: `The airport code for ${name}, ${country_name} is ${code}`
            }
          });
        }
        default: {
          const cardResults = results.map(({ name, country_name, code }) => (`• ${name}, ${country_name}: ${code}`));
          return Response.build({
            ask: (
              <speak>
                <s>{`I found ${count} results for ${query}`}</s>
                {results.map((result) => <p><Airport {...result} brief={true} /><break time='0.25s' /></p>)}
                <break time='1s' />
                <s>Would you like to search for another?</s>
              </speak>
            ),
            reprompt: 'Would you like to search for another?',
            card: {
              title: `Airport search for ${query}`,
              content: `There were ${count} results for ${query}:\n\n${cardResults.join('\n')}`
            }
          });
        }
      }
    }).catch((error) => {
      console.error(error);
      return Response.build({
        say: "I'm having trouble looking up airports at the moment. Please try again later."
      });
    });
  }

  @Intent('AMAZON.YesIntent')
  yes() {
    return Response.build({
      ask: 'Which city would you like to search for?',
      reprompt: 'Which city would you like to search for?'
    });
  }

  @Intent('AMAZON.HelpIntent')
  help() {
    return Response.build({
      ask: 'The "Airport Search" skill finds details for airports world wide. Would you like to start a search?',
      reprompt: 'Would you like to start an airport search?'
    });
  }

  @Intent('AMAZON.CancelIntent', 'AMAZON.StopIntent', 'AMAZON.NoIntent')
  stop() {
    return say('Goodbye!');
  }

}

export default Skill(App);
