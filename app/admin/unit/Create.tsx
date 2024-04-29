import { Create, NumberInput, ReferenceInput, SimpleForm, TextInput, required } from "react-admin";

const UnitCreate = () => {
	return (
		<Create>
			<SimpleForm>
				<TextInput source="title" validate={[required()]} label="title" />
				<TextInput source="description" validate={[required()]} label="description" />
				<ReferenceInput source="courseId" reference="courses" />
				<NumberInput source="order" validate={[required()]} label="order" />
			</SimpleForm>
		</Create>
	);
};

export default UnitCreate;
