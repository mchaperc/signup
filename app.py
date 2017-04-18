import falcon
from falcon_cors import CORS
from pymongo import MongoClient
from bson import Binary, Code
from bson.json_util import dumps

connection = MongoClient('ds161950.mlab.com', 61950)
db = connection['heroku_08bc3pdq']
db.authenticate('heroku_08bc3pdq', 'jobkq04sg3dsg8881uncchd5d0')

auditions = db.posts


cors = CORS(allow_origins_list=['https://mchaperc.github.io/signup'])
public_cors = CORS(allow_all_origins=True)


class GetExistingDoc(object):
    cors = public_cors
    def on_get(self, req, resp):
        """Handles GET requests"""
        existing_doc = auditions.find_one({'ensemble': 'Singers'})
        resp.status = falcon.HTTP_200
        resp.body = dumps(existing_doc)


app = falcon.API(middleware=[cors.middleware])
get_docs = GetExistingDoc()


app.add_route('/get_docs/', get_docs)