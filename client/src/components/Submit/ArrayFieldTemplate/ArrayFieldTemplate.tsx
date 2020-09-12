// code modified from the following repo: 
// https://github.com/rjsf-team/react-jsonschema-form/blob/master/packages/bootstrap-4/src/ArrayFieldTemplate

import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import { ArrayFieldTemplateProps, IdSchema } from "@rjsf/core";

import { IoIosRemove } from "react-icons/io";
import { GrAdd } from "react-icons/gr";
import { AiOutlinePlus } from "react-icons/ai";

const ArrayFieldTemplate = (props: ArrayFieldTemplateProps) => (
  <DefaultNormalArrayFieldTemplate {...props}/>
);

type ArrayFieldTitleProps = {
  TitleField: any;
  idSchema: IdSchema;
  title: string;
  required: boolean;
};

const ArrayFieldTitle = ({
  TitleField,
  idSchema,
  title,
  required,
}: ArrayFieldTitleProps) => {
  if (!title) {
    return null;
  }

  const id = `${idSchema.$id}__title`;
  return <TitleField id={id} title={title} required={required} />;
};

type ArrayFieldDescriptionProps = {
  DescriptionField: any;
  idSchema: IdSchema;
  description: string;
};

const ArrayFieldDescription = ({
  DescriptionField,
  idSchema,
  description,
}: ArrayFieldDescriptionProps) => {
  if (!description) {
    return null;
  }

  const id = `${idSchema.$id}__description`;
  return <DescriptionField id={id} description={description} />;
};

const mappings: any = {
  remove: <IoIosRemove />,
  plus: <GrAdd />
};

type IconButtonProps = {
  icon: string;
  className?: string;
  tabIndex?: number;
  style?: any;
  disabled?: any;
  onClick?: any;
};

const IconButton = (props: IconButtonProps) => {
  const { icon, className, ...otherProps } = props;
  return (
    <Button {...otherProps} variant="secondary" size="sm">
      {mappings[icon]}
    </Button>
  );
};

const DefaultArrayItem = (props: any) => {
  const btnStyle = {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    fontWeight: "bold",
  };
  return (
    <div key={props.key}>
      <Row className="mb-2  d-flex align-items-center">
        <Col xs="9" lg="9">{props.children}</Col>

        <Col xs="3" lg="3" className="py-4">
          {props.hasToolbar && (
            <div className="d-flex flex-row">
              {props.hasRemove && (
                <div className="m-0 p-0">
                  <IconButton
                    icon="remove"
                    tabIndex={-1}
                    style={btnStyle as any}
                    disabled={props.disabled || props.readonly}
                    onClick={props.onDropIndexClick(props.index)}
                  />
                </div>
              )}
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

const DefaultNormalArrayFieldTemplate = (props: ArrayFieldTemplateProps) => {
  return (
    <div>
      <Row className="p-0 m-0">
        <Col className="p-0 m-0">
        <ArrayFieldTitle
          key={`array-field-title-${props.idSchema.$id}`}
          TitleField={props.TitleField}
          idSchema={props.idSchema}
          title={props.uiSchema["ui:title"] || props.title}
          required={props.required}
        />

        {(props.uiSchema["ui:description"] || props.schema.description) && (
          <ArrayFieldDescription
            key={`array-field-description-${props.idSchema.$id}`}
            DescriptionField={props.DescriptionField}
            idSchema={props.idSchema}
            description={
              props.uiSchema["ui:description"] || props.schema.description
            }
          />
        )}

        <Container fluid key={`array-item-list-${props.idSchema.$id}`} className="p-0 m-0">
          {props.items && props.items.map(p => DefaultArrayItem(p))}

          {props.canAdd && (
            <Row className="mt-2">
              <Col xs={3} className="py-4 col-lg-3 col-3">
                <Button
                  className="add-button"
                  onClick={props.onAddClick}
                  style={{width: "100%"}}
                  disabled={props.disabled || props.readonly}
                >
                  <AiOutlinePlus/>
                </Button>
              </Col>
            </Row>
          )}
        </Container></Col>

      </Row>
    </div>
  );
};

export default ArrayFieldTemplate;