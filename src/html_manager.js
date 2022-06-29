var permissions = []



function check_permissions(uid) {
    fb_readRec(AUTHPATH, uid, permissions, _processData);
    return permissions;
}