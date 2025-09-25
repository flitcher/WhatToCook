import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Plus } from 'lucide-react-native';
import { useCallback, useMemo, useRef, useState } from 'react';
import { GestureResponderEvent, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Recipes() {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['25%', '50%', '95%'], []);
    const [bottomSheetOpen, setBottomSheetOpen] = useState(3)
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        ingredients: [] as string[],
    })

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const openBottomSheet = () => {
        bottomSheetRef.current?.expand();
    };

    const closeBottomSheet = () => {
        bottomSheetRef.current?.close();
        setBottomSheetOpen(-1)
    };

    function handlePress(event: GestureResponderEvent): void {
        setBottomSheetOpen(3)
        openBottomSheet()
    }
    // TODO: setup bottom sheet to insert into recipes

    const step1 = () => (
        <View className="flex flex-col gap-4">
            <View className="flex flex-col gap-3 ">
                <Text className="text-gray-600">
                    Title
                </Text>
                <Input
                    className="border-gray-300"
                    onChangeText={(title) => setFormData({ ...formData, title: title })}
                />
            </View>
            <View>
                <Text className="text-gray-600">
                    Description
                </Text>
                <Textarea
                    className="border-gray-300 h-24"
                    onChangeText={(description) => setFormData({ ...formData, description: description })} />
            </View>
        </View>
    )

    const step2 = () => (
        <View className="flex flex-col gap-4">
            <View className="flex flex-col gap-3 ">
                <Text className="text-gray-600">
                    Ingredients
                </Text>
                <View className="flex flex-row gap-1">
                    <Input
                        className="border-gray-300 w-80"
                        onChangeText={(ingredient) => setFormData({ ...formData, ingredients: [...formData.ingredients, ingredient] })}
                    />
                    <Button variant={"outline"}>
                        <Icon as={Plus} />
                    </Button>
                </View>
            </View>
            {
                formData.ingredients.map(ingredient =>
                    <Text>
                        ingredient
                    </Text>
                )
            }
        </View>
    )

    return (
        <View className="flex-1 pt-safe pl-safe pr-safe overflow-y-auto">

            <GestureHandlerRootView style={{ flex: 1 }} >
                <BottomSheet
                    ref={bottomSheetRef}
                    index={bottomSheetOpen} // Start closed
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    enablePanDownToClose={false}
                    backgroundStyle={{ backgroundColor: 'white' }}
                    handleIndicatorStyle={{ backgroundColor: '#cbd5e1' }}
                >

                    <BottomSheetView className="p-5">
                        <View className="flex-row justify-between items-center mb-6">
                            <Text className="text-3xl font-bold text-gray-800">Add recipe</Text>
                            <TouchableOpacity onPress={closeBottomSheet}>
                                <Ionicons name="close" size={24} color="#64748b" />
                            </TouchableOpacity>
                        </View>

                        {
                            step === 1 ? step1() :
                                step === 2 ? step2() :
                                    null

                        }

                    </BottomSheetView>
                </BottomSheet>
            </GestureHandlerRootView>
            {bottomSheetOpen === -1 ?
                (
                    <View className={`absolute bottom-5 right-5 z-10`} >
                        <TouchableOpacity
                            onPress={handlePress}
                            activeOpacity={0.8}
                            className="w-16 h-16 rounded-full bg-blue-500 items-center justify-center shadow-lg shadow-blue-500/40"
                        >
                            <Ionicons name="add" size={28} color="white" />
                        </TouchableOpacity>
                    </View>
                )
                :
                (<></>)}
        </View >

    );


}



interface CheckboxProps {
    id: number;
    value: string;
}

function Checkbox(props: CheckboxProps) {
    return (
        <View>
            <Text>{props.value}</Text>
        </View>
    )
}
