import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../ducks/hooks";
import { getLanguages } from "./languagesSlice";
import { LanguageContainer } from "./components";
import { Container, Col, Row, Accordion, Card } from "react-bootstrap";

const UnitsPage = () => {
  const dispatch = useAppDispatch();
  const languages = useAppSelector((state) => state.languages.languages);
  const languagesStatus = useAppSelector((state) => state.languages.status);

  useEffect(() => {
    if (languagesStatus === "idle") {
      dispatch(getLanguages({}));
    }
  }, [dispatch, languagesStatus]);

  return (
    <Container>
      <Col>
        <h1>Languages</h1>
        {languagesStatus === "idle" && <p>About to load units</p>}
        {languagesStatus === "loading" && <p>Languages are loading...</p>}
        {languagesStatus === "failed" && <p>Error fetching units</p>}
        {languagesStatus === "succeeded" && (
          <Accordion>
            {languages?.map((language) => {
              return (
                <LanguageContainer language={language} key={language.id} />
              );
            })}
          </Accordion>
        )}
      </Col>
    </Container>
  );
};
export default UnitsPage;
