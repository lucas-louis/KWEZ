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
        self.request = f"SELECT ?result WHERE {{?result rdf:type {self.type}; {self.spec} \"{self.value}\"@{self.lang} .}} LIMIT {self.limit}"

    def send_request(self) -> dict:
        self.wrapper.setQuery(self.request)
        results = self.wrapper.queryAndConvert()
        if len(results.get("results").get("bindings")) == 0:
            return {"results": []}
        results = results.get("results").get("bindings")[0]
        final_results = {"results": [{"uri": results.get("result").get("value")}]}
        # uri: results.get("result").get("value")
        # others: results.get("propName").get("value")
        return final_results