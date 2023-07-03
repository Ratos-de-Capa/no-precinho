import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type OriginDocument = Origin & Document & TimestampedDocument;

export type OriginProps = {
    name: string;
    url: string;
    imgSource: string;
};

@Schema({ timestamps: true})
export class Origin {
    constructor(props: OriginProps){
        Object.assign(this, props);   
    }

    @Prop({ required: true})
    name: string;

    @Prop({ required: true})
    url: string;

    @Prop({ required: true})
    imgSource: string;
};

// TODO: CHECK IF IS REQUIRE TO INDEX ALL THE PROPS
export const OriginSchema = SchemaFactory.createForClass(Origin).index({ name: 1 }, { unique: true });