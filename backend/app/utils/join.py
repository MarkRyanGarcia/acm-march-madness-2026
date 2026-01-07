import secrets
import string

alphabet = string.ascii_uppercase + string.digits


def create_invite_code(size=8) -> str:
    """
    Generates a random invite code string of size `size` (default 8)
    consisting of only uppercase letters and digits.
    """
    return "".join([secrets.choice(alphabet) for _ in range(size)])
