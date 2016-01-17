from datetime import datetime
from time import mktime, strptime
from twatter import settings
from twitter import Api


class Search(object):
    def __init__(self, hashtag):
        self.api = Api(
            settings.CONSUMER_KEY,
            settings.CONSUMER_SECRET,
            settings.ACCESS_KEY,
            settings.ACCESS_SECRET
        )

        hashtag = hashtag.lower().strip()
        if hashtag.startswith('#'):
            hashtag = hashtag[1:]

        if not hashtag:
            raise Exception('Hashtag is empty')

        self.hashtag = hashtag

    def search(self):
        for word in settings.SWEAR_WORDS:
            for result in self.api.GetSearch(
                term='%s #%s -"RT @"' % (word, self.hashtag),
                lang='en',
                count=200,
                result_type='recent'
            ):
                yield dict(
                    id=result.id,
                    text=' '.join(result.text.splitlines()).strip(),
                    date=datetime.fromtimestamp(
                        mktime(
                            strptime(result.created_at,
                                     '%a %b %d %H:%M:%S +0000 %Y'
                                     )
                        )
                    ),
                    username=result.user.screen_name,
                    user_id=result.user.id,
                    location=result.user.location,
                    avatar=result.user.profile_image_url,
                    word=word
                )
