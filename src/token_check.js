import jwtDecode from "jwt-decode";

export function decodeToken(token) {
	try {
		const decoded = jwtDecode(token);
		return decoded;
	} catch (error) {
		console.error("Error decoding token:", error);
		return null;
	}
}

export function getUserId(token) {
	const decoded = decodeToken(token);
	if (decoded && decoded.sub) {
		return decoded.sub;
	}
	return null;
}

export function getTokenExpirationDate(token) {
	const decoded = decodeToken(token);
	if (decoded && decoded.exp) {
		return new Date(decoded.exp * 1000);
	}
	return null;
}

export function isTokenExpired(token) {
	const date = getTokenExpirationDate(token);
	if (date === null) {
		return false;
	}
	return !(date.valueOf() > new Date().valueOf());
}

export function getValidUsername(token) {
	if (!isTokenExpired(token)) {
		const decoded = decodeToken(token);
		if (decoded && decoded.sub) {
			return decoded.sub;
		}
	}
	return null;
}
