import {
  ADD_NEW_TWEETS,
  POSTED_TWEETS,
  SCHEDULED_TWEETS,
  POST_TWEET,
  TRASH_TWEET,
  EDIT_TWEET_REQUEST,
  EDIT_TWEET,
  CANCEL_EDIT_TWEET,
  SCHEDULE_TWEET,
} from '../constants.js';

function tweet(state, action) {
  switch (action.type) {
    case ADD_NEW_TWEETS:
      return action.tweets.map(t => (
        Object.assign({}, t)
      ));
    case POSTED_TWEETS:
      return action.postedtweets.map(t => (
        Object.assign({}, t, { tweet_status: 'posted_in_db' })
      ));
    case SCHEDULED_TWEETS:
      return action.scheduledtweets.map(t => (
        Object.assign({}, t, { tweet_status: 'scheduled_in_db' })
      ));
    case POST_TWEET:
      if (state.bot_tweet_id === action.id) {
        return Object.assign({}, state, { tweet_status: 'posted' });
      }
      return state;
    case TRASH_TWEET:
      if (state.bot_tweet_id === action.id) {
        return Object.assign({}, state, { tweet_status: 'trashed' });
      }
      return state;
    case EDIT_TWEET_REQUEST:
      if (state.bot_tweet_id === action.id) {
        return Object.assign({}, state, { editing: true });
      }
      return state;
    case EDIT_TWEET:
      if (state.bot_tweet_id === action.id) {
        return Object.assign({}, state, { editing: false, tweet_text: action.tweet_text });
      }
      return state;
    case CANCEL_EDIT_TWEET:
      if (state.bot_tweet_id === action.id) {
        return Object.assign({}, state, { editing: false });
      }
    case SCHEDULE_TWEET:
      if (state.bot_tweet_id === action.id) {
        return Object.assign({}, state, { tweet_status: 'scheduled', schedule: action.schedule })
      }
      return state;
    default:
      return state;
  }
}

function tweets(state = /*JSON.parse(localStorage.getItem('tweets')) || */[], action) {
  console.log('in tweets state reducer');
  switch (action.type) {
    case ADD_NEW_TWEETS:
    case POSTED_TWEETS:
    case SCHEDULED_TWEETS:
      return [
        ...tweet(null, action)
      ];
    case POST_TWEET:
    case TRASH_TWEET:
    case CANCEL_EDIT_TWEET:
    case EDIT_TWEET_REQUEST:
    case EDIT_TWEET:
    case SCHEDULE_TWEET:
      return state.map(t => tweet(t, action));
    default:
      return state;
  }
}

export default tweets;
