import { z } from 'zod';

const uuid = z.string().uuid();

const isValidUUID = (value: string) => {
	try {
		if (uuid.parse(value)) {
			return true;
		} else {
			return false;
		}
	} catch {
		return false;
	}
};

export { isValidUUID };
