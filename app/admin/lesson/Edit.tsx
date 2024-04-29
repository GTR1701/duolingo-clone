import { Edit, NumberInput, ReferenceInput, SimpleForm, TextInput, required } from "react-admin";

const LessonEdit = () => {
	return (
		<Edit>
			<SimpleForm>
				<TextInput source="title" validate={[required()]} label="title" />
				<ReferenceInput source="unitId" reference="units" />
				<NumberInput source="order" validate={[required()]} label="order" />
			</SimpleForm>
		</Edit>
	);
};

export default LessonEdit;
