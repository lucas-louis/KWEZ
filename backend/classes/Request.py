from SPARQLWrapper import SPARQLWrapper, JSON

class Request():

    def __init__(self, wrapper: SPARQLWrapper, type: str, spec: str, value: str, lang: str = "en", limit: int = 5):
        self.wrapper = wrapper
        self.type = type
        self.spec = spec
        self.value = value
        self.lang = lang
        self.limit = limit
        self.set_request()

    def __str__(self) -> str:
        return f"<Request  type={self.type}  spec={self.spec}  value={self.value}>"


    def set_request(self):
        lang_filters = f"FILTER(LANG(?name) = \"\" || LANG(?name) = \"{self.lang}\")\nFILTER(LANG(?abstract) = \"\" || LANG(?abstract) = \"{self.lang}\")"
        filters = f"FILTER (STR(?{self.spec}) = \"{self.value}\")\n" + lang_filters
        self.request = f"SELECT * WHERE {{?uri rdf:type {self.type}; dbp:name ?name; dbo:abstract ?abstract.\n{filters}}} LIMIT {self.limit}"

    def send_request(self) -> dict:
        self.wrapper.setQuery(self.request)
        results = self.wrapper.queryAndConvert()
        if len(results.get("results").get("bindings")) == 0:
            return {"results": []}
        results = results.get("results").get("bindings")[0]
        final_results = {
            "results": [
                {
                    "uri": results.get("uri").get("value"),
                    "type": self.type,
                    "name": results.get("name").get("value"),
                    "abstract": results.get("abstract").get("value")
                }
            ]
        }
        return final_results
