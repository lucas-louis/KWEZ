from SPARQLWrapper import SPARQLWrapper, JSON

class Request():

    def __init__(self, wrapper: SPARQLWrapper, type: str, spec: str, value: str, extra_data: dict, lang: str = "en", limit: int = 5):
        self.wrapper = wrapper
        self.type = type
        self.spec = spec
        self.value = value
        self.query_type = extra_data.get("type")
        self.spec_type = extra_data.get("spec_type")
        self.prop_type = extra_data.get("prop_type")
        self.lang = lang
        self.limit = limit
        self.set_request()

    def __str__(self) -> str:
        return f"<Request  type={self.type}  spec={self.spec}  value={self.value}>"


    def set_request(self):
        filters = f"\tFILTER(LANG(?name) = \"\" || LANG(?name) = \"{self.lang}\")\n\tFILTER(LANG(?abstract) = \"\" || LANG(?abstract) = \"{self.lang}\")\n"
        result = f"?result rdf:type {self.type}; dbp:name ?name; dbo:abstract ?abstract.\n"

        if self.query_type == "primary":
            result = f"?result rdf:type {self.type}; dbp:name ?name; dbo:abstract ?abstract.\n"
            inter = ""
            filters += f"\tFILTER (LCASE(STR(?{self.spec})) = LCASE(\"{self.value}\"))\n"
        else:
            result = f"?result rdf:type {self.type}; ^{self.prop_type} ?{self.spec}; dbp:name ?name; dbo:abstract ?abstract.\n"
            inter = f"?{self.spec} rdf:type {self.spec_type}; dbp:name ?{self.spec}Name.\n"
            filters += f"\tFILTER (LCASE(STR(?{self.spec}Name)) = LCASE(\"{self.value}\"))\n"

        self.request = f"SELECT * WHERE {{\n\t{inter}\t{result}{filters}}} LIMIT {self.limit}"

    def send_request(self) -> dict:
        self.wrapper.setQuery(self.request)
        results = self.wrapper.queryAndConvert()
        if len(results.get("results").get("bindings")) == 0:
            return {"results": []}
        results = results.get("results").get("bindings")
        final_results = {
            "results": [
                {
                    "uri": result.get("result").get("value"),
                    "type": self.type,
                    "name": result.get("name").get("value"),
                    "abstract": result.get("abstract").get("value")
                } for result in results
            ]
        }
        return final_results
