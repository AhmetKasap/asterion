import { METADATA_KEYS } from "../../metadata/metadata.keys"

export function Controller(path: string): ClassDecorator {
	return (target) => {
		Reflect.defineMetadata(METADATA_KEYS.BASE_PATH, path, target)
	}
}
