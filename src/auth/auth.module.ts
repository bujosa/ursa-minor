import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { GlobalJwtAuthAndRolesGuard } from 'src/common/auth/guards/global-jwt-auth-and-roles.guard';
import { JwtStrategy } from 'src/common/auth/strategies/jwt.strategy';
import { CredentialModule } from 'src/credential/credential.module';
import { RefreshTokenModule } from 'src/refresh-token/refresh-token.module';
import { UserModule } from 'src/user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { TokensService } from './tokens.service';

@Module({
  imports: [
    forwardRef(() => UserModule),
    CredentialModule,
    RefreshTokenModule,
    ConfigModule.forRoot({
      envFilePath: `./env/.inspection.env`,
    }),
    JwtModule.register({}),
  ],
  providers: [
    AuthService,
    TokensService,
    LocalStrategy,
    JwtStrategy,
    AuthResolver,
    ...GlobalJwtAuthAndRolesGuard,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
