from flask import Flask, request as req
from flask_cors import CORS
from SPARQLWrapper import SPARQLWrapper, JSON
import json, os
from classes.Request import Request

sparql = SPARQLWrapper("http://dbpedia.org/sparql")
sparql.setReturnFormat(JSON)

app = Flask(__name__)
cors = CORS(app)

path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "query_args.json")
with open(path, 'r') as file:
    query_args = json.load(file)


@app.route("/<string:type>/<string:spec>/<string:value>")
def get(type, spec, value):
    type = type.lower()
    spec = spec.lower()
    lang = req.args.get("lang") or "en"
    limit = req.args.get("limit") or "5"

    if type not in query_args.keys():
        return {}, 401
    if spec not in query_args.get(type).get("specs").keys():
        return {}, 401

    id = query_args.get(type).get("type")
    extra_data = query_args.get(type).get("specs").get(spec)

    try:
        request = Request(sparql, id, spec, value, extra_data, lang, int(limit))
        results = request.send_request()
    except Exception as e:
        print(e)
        return str(e), 500

    return results, 200 if len(results.get("results")) != 0 else 404

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
