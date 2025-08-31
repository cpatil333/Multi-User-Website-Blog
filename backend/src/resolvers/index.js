"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
function requiredRole(ctx, roles) {
    if (!ctx.user || !roles.includes(ctx.user.role)) {
    }
}
exports.resolvers = {
    Query: {},
    Mutation: {},
};
