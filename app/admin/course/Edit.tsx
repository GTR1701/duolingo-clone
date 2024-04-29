import { Create, Edit, SimpleForm, TextInput, required } from "react-admin";

const CourseEdit = () => {
	return (
		<Edit>
			<SimpleForm>
				<TextInput source="id" validate={[required()]} label="id" />
				<TextInput source="title" validate={[required()]} label="title" />
				<TextInput source="imageSrc" validate={[required()]} label="imageSrc" />
			</SimpleForm>
		</Edit>
	);
};

export default CourseEdit;
