# Twatter

A Python package for collating tweets with swear words in them, for generating
an infographic showing which cusses have most tweets.

# Installation

Run `python setup.py install`

# Usage

You need to populate your environment with the following variables:

- `TWITTER_CONSUMER_KEY`
- `TWITTER_CONSUMER_SECRET`
- `TWITTER_ACCESS_KEY`
- `TWITTER_ACCESS_SECRET`

You can generate those by registering a new app with Twitter.

Then run `twatter <hashtag>`, specifying the hashtag you'd like to use to base
your search on. You can optionally specify `--format`, adding `csv` or `json`
to specify how you'd like the results to be formatted (the default is CSV). The
tool brings back a list of tweets with ID, text, date, username, user ID,
user's location, their avatar URL and the swearword that triggered the hit.
