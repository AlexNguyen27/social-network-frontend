import React from "react";
import ContentEditable from "react-contenteditable";

const PageTitle = ({ title, center, editMode, onChange, onBlur }) => {
  return (
    <div className={`my-3 ${center ? "text-center" : ""}`}>
      {
        {
          true: (
            <ContentEditable
              innerRef={React.createRef()}s
              html={title}
              disabled={false}
              onChange={onChange}
              tagName="h1"
              onBlur={onBlur}
            />
          ),
          false: <ContentEditable html={title} disabled={true} tagName="h1" />
        }[editMode === "true"]
      }
    </div>
  );
};

export default PageTitle;
