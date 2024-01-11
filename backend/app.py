from flask import Flask, request as req
from SPARQLWrapper import SPARQLWrapper, JSON
from classes.Request import Request

sparql = SPARQLWrapper("http://dbpedia.org/sparql")
sparql.setReturnFormat(JSON)

app = Flask(__name__)

types = {
    "artist": "dbo:MusicalArtist",
    "album": "dbo:Album"
    }

specs = {
    "name": "dbp:name",
    "label": "rdfs:label"
    }

@app.route("/<string:type>/<string:spec>/<string:value>")
def get(type, spec, value):
    lang = req.args.get("lang") or "en"
    limit = req.args.get("limit") or "5"

    if type not in types.keys() or spec not in specs.keys():
        return {}, 401
    if type == "album" and spec == "name":
        spec = "label"

    request = Request(sparql, types.get(type), specs.get(spec), value, lang, int(limit))
    results = request.send_request()

    print(f"\n\nResults for query:\n{results}")
    return results, 200

if __name__ == "__main__":
    app.run(host='0.0.0.0')
