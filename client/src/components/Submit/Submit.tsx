import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSchema, submitProject } from "../../store/submit/submit.actions";
import schema from "./SubmitFormSchema/SubmitFormSchema.json";
import uiSchema from "./SubmitFormSchema/UISchema.json";
import Navbar from "../Navbar/Navbar";
import SubmittedModal from "./SubmittedModal/SubmittedModal";
import { withTheme } from "@rjsf/core";
import ArrayFieldTemplate from "./ArrayFieldTemplate/ArrayFieldTemplate";
import "./Submit.scss";

const Submit = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const submitted = useSelector((state) => state.submit.submitted);
  const formSchema = useSelector((state) => state.submit.schema);

  const ThemedForm = withTheme({
    ArrayFieldTemplate: ArrayFieldTemplate,
  });

  useEffect(() => {
    dispatch(setSchema(schema));
  }, [dispatch]);

  return (
    <React.Fragment>
      <Navbar />
      <div className="submit-header">
        <h1>Submit a Project</h1>
      </div>
      {formSchema != null && (
        <ThemedForm
          schema={formSchema}
          uiSchema={uiSchema}
          onSubmit={(form) => dispatch(submitProject(user.uid, form.formData))}
          className="submit-project"
        />
      )}
      {submitted && <SubmittedModal show={submitted} />}
    </React.Fragment>
  );
};

export default Submit;
