import falcon
from falcon_cors import CORS
from pymongo import MongoClient
from bson.json_util import dumps
import json

connection = MongoClient('ds161950.mlab.com', 61950)
db = connection['heroku_08bc3pdq']
db.authenticate('heroku_08bc3pdq', 'jobkq04sg3dsg8881uncchd5d0')

auditions = db.posts


cors = CORS(allow_origins_list=['https://mchaperc.github.io', 'file:///Users/mattchastain/Desktop/dev'])
public_cors = CORS(allow_all_origins=True)


class GetStudentSignups(object):
    cors = public_cors
    def on_get(self, req, resp):
        """Handles GET requests"""
        existing_doc = auditions.find_one({'ensemble': 'Singers'})
        resp.status = falcon.HTTP_200
        print(resp.status)
        resp.body = dumps(existing_doc)


class PostStudentSignup(object):
    cors = public_cors
    def on_post(self, req, resp):
        chunk = req.stream.read(4096).decode('utf-8')
        if not chunk:
            return
        print(chunk, json.loads(chunk))
        auditions.update({'_id': 1}, {"$set": {'time_slots': json.loads(chunk)}}, upsert=False)


app = falcon.API(middleware=[cors.middleware])
get_signups = GetStudentSignups()
post_signups = PostStudentSignup()


app.add_route('/get_docs/', get_signups)
app.add_route('/post_docs/', post_signups)