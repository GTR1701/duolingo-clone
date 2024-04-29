import { Create, NumberInput, ReferenceInput, SimpleForm, TextInput, required } from "react-admin";

const LessonCreate = () => {
	return (
		<Create>
			<SimpleForm>
				<TextInput source="title" validate={[required()]} label="title" />
				<ReferenceInput source="unitId" reference="units" />
				<NumberInput source="order" validate={[required()]} label="order" />
			</SimpleForm>
		</Create>
	);
};

export default LessonCreate;
