type FormRootProps = React.ComponentProps<'form'>;

type FormSectionProps = {
  children: React.ReactNode;
  className?: string;
};

type FormComponent = React.FC<FormRootProps> & {
  Header: React.FC<FormSectionProps>;
  Field: React.FC<FormSectionProps>;
  Footer: React.FC<FormSectionProps>;
  Input: React.FC<React.ComponentProps<'input'>>;
  Label: React.FC<React.ComponentProps<'label'>>;
};

export const Form: FormComponent = ({ children, className, ...props }) => {
  return (
    <form
      {...props}
      className={`rounded-md bg-white p-4 ${className ?? ''}`}
    >
      {children}
    </form>
  );
};

Form.Header = ({ children, className }) => (
  <div className={`flex justify-center items-center my-2 ${className ?? ''}`}>
    {children}
  </div>
);

Form.Field = ({ children, className }) => (
  <div className={`flex flex-col items-start gap-2 ${className ?? ''}`}>
    {children}
  </div>
);

Form.Footer = ({ children, className }) => (
  <div className={`flex items-center justify-center py-2 ${className ?? ''}`}>
    {children}
  </div>
);

Form.Label = function Label(
  props: React.ComponentProps<'label'>
) {
  return (
    <label
      {...props}
      className={`text-xs font-medium ${props.className ?? ''}`}
    />
  );
};

Form.Input = function Input(
  props: React.ComponentProps<'input'>
) {
  return (
    <input
      {...props}
      className={`border border-gray-200 rounded px-2 py-1 text-xs ${props.className ?? ''}`}
    />
  );
};
