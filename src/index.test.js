import Skill from './index';
import Request from 'alexa-request';

jest.mock('./search');

test('Launch intent', () => {
  const event = Request.launchRequest().build();

  return expect(Skill(event)).resolves.toMatchSnapshot();
});

test('Search intent with no results', () => {
  const event = Request.intent('Search', { query: 'foobar' }).build();

  return expect(Skill(event)).resolves.toMatchSnapshot();
});

test('Search intent with single result', () => {
  const event = Request.intent('Search', { query: 'Belfast City Airport' }).build();

  return expect(Skill(event)).resolves.toMatchSnapshot();
});

test('Search intent with multiple results', () => {
  const event = Request.intent('Search', { query: 'New York' }).build();

  return expect(Skill(event)).resolves.toMatchSnapshot();
});

test('Help intent', () => {
  const event = Request.intent('AMAZON.HelpIntent').build();

  return expect(Skill(event)).resolves.toMatchSnapshot();
});

test('Yes intent', () => {
  const event = Request.intent('AMAZON.YesIntent').build();

  return expect(Skill(event)).resolves.toMatchSnapshot();
});

test('No intent', () => {
  const event = Request.intent('AMAZON.NoIntent').build();

  return expect(Skill(event)).resolves.toMatchSnapshot();
});

test('Cancel intent', () => {
  const event = Request.intent('AMAZON.CancelIntent').build();

  return expect(Skill(event)).resolves.toMatchSnapshot();
});

test('Stop intent', () => {
  const event = Request.intent('AMAZON.StopIntent').build();

  return expect(Skill(event)).resolves.toMatchSnapshot();
});
