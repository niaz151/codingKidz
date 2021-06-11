import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../ducks/hooks";
import { getLanguages } from "./languagesSlice";
import { LanguageContainer, UnitContainer } from "./components";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

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
          <div>
            {languages?.map((language) => {
              return (
                <Row>
                  <LanguageContainer language={language} key={language.id} />
                </Row>
              );
            })}
          </div>
        )}
      </Col>
    </Container>
  );
};
export default UnitsPage;
